import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
const AdminPanel = lazy(() => import("./components/AdminPanel"));
import BackgroundOrbs from "./components/BackgroundOrbs";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import CollaborationSection from "./sections/CollaborationSection";
import ContactSection from "./sections/ContactSection";
import CreativeHero from "./sections/CreativeHero";
import CreativeSkillsSection from "./sections/CreativeSkillsSection";
import DesignsSection from "./sections/DesignsSection";
import EducationSection from "./sections/EducationSection";
import ProjectsSection from "./sections/ProjectsSection";
import ResumeSection from "./sections/ResumeSection";
import SkillsSection from "./sections/SkillsSection";
import SoftwareHero from "./sections/SoftwareHero";
import VideosSection from "./sections/VideosSection";
import { normalizeSiteContent, siteContentDefaults } from "./data/siteContent";
import useLocalStorageState from "./hooks/useLocalStorageState";
import resumePdfUrl from "./resumes/Harshal_WE_S_Python_UI.pdf";

const firstSectionByTab = {
  software: "software-hero",
  creative: "creative-hero",
};

const CONTENT_STORAGE_KEY = "portfolio-site-content";
const THEME_STORAGE_KEY = "portfolio-theme";
const DEFAULT_ADMIN_PROFILE = {
  username: import.meta.env.VITE_ADMIN_USERNAME ?? "admin",
  email: import.meta.env.VITE_ADMIN_EMAIL ?? "harshalpimpare99@gmail.com",
};


export default function App() {
  const [activeTab, setActiveTab] = useState("software");
  const [activeSection, setActiveSection] = useState("software-hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useLocalStorageState(CONTENT_STORAGE_KEY, () =>
    normalizeSiteContent(siteContentDefaults)
  );
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [view, setView] = useState("site");
  const [loginError, setLoginError] = useState("");
  const [adminProfile, setAdminProfile] = useState(DEFAULT_ADMIN_PROFILE);
  const [authReady, setAuthReady] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  });

  const sessionTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Auto-logout after 5 minutes (300000ms) of no activity while admin is authenticated.
  useEffect(() => {
    if (!adminAuthenticated) {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
      return undefined;
    }

    const LOGOUT_DELAY = 5 * 60 * 1000; // 5 minutes

    const resetTimer = () => {
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = setTimeout(() => {
        void handleLogout();
      }, LOGOUT_DELAY);
    };

    // listen for user interactions to reset the timer
    window.addEventListener("click", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    // start initial timer
    resetTimer();

    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [adminAuthenticated]);

  useEffect(() => {
    let cancelled = false;

    async function loadAdminSession() {
      try {
        const [metaResponse, sessionResponse] = await Promise.all([
          fetch("/api/admin/meta", { credentials: "include" }),
          fetch("/api/me", { credentials: "include" }),
        ]);

        if (!cancelled && metaResponse.ok) {
          const meta = await metaResponse.json();
          setAdminProfile((current) => ({
            ...current,
            username: meta.username || current.username,
            email: meta.email || current.email,
          }));
        }

        if (!cancelled) {
          if (sessionResponse.ok) {
            const data = await sessionResponse.json();
            setAdminAuthenticated(true);
            setAdminProfile((current) => ({
              ...current,
              username: data.user?.username || current.username,
              email: data.user?.email || current.email,
            }));
          } else {
            setAdminAuthenticated(false);
          }
        }
      } catch {
        if (!cancelled) {
          setAdminAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setAuthReady(true);
        }
      }
    }

    loadAdminSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, "") === "/admin") {
      setView("admin");
    }
  }, []);

  useEffect(() => {
    if (view !== "site") return;
    setActiveSection(firstSectionByTab[activeTab]);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, view]);

  useEffect(() => {
    if (view !== "site") return undefined;
    const sections = Array.from(document.querySelectorAll("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activeTab, view]);

  function navigateTo(id) {
    if (view !== "site") return;
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  async function downloadResume() {
    // If the resume PDF is bundled in `src/resumes`, use that URL (Vite provides a proper asset URL).
    try {
      if (resumePdfUrl) {
        const link = document.createElement("a");
        link.href = resumePdfUrl;
        link.download = "Harshal_WE_S_Python_UI.pdf";
        link.click();
        return;
      }
    } catch (e) {
      // fall back to text resume
    }

    // Fallback: generate a simple text resume if the PDF isn't available
    const resumeText = `${content.navigation.brandName}
${content.softwareHero.badge}

Highlights:
- ${content.softwareHero.stackItems.map((item) => item.value).join("\n- ")}
- ${content.softwareHero.summary}

Contact:
${content.contactLinks.map((item) => item.value).join("\n")}
`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Harshal_Pimpare_Resume.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function workTogether() {
    setActiveTab("software");
    window.setTimeout(() => {
      const contact = document.getElementById("contact");
      contact?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  }

  async function handleLogin(username, password) {
    setLoginError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setAdminAuthenticated(false);
        setLoginError("Invalid admin credentials.");
        return false;
      }

      const data = await response.json();
      setAdminAuthenticated(true);
      setAdminProfile((current) => ({
        ...current,
        username: data.user?.username || current.username,
        email: data.user?.email || current.email,
      }));
      window.history.replaceState({}, "", "/admin");
      setView("admin");
      return true;
    } catch {
      setAdminAuthenticated(false);
      setLoginError("Could not reach the admin server.");
      return false;
    }
  }

  async function handleLogout() {
    // clear session timer immediately
    try {
      if (sessionTimerRef?.current) {
        clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
    } catch (e) {
      // ignore
    }

    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore logout failures and clear the local state either way
    }

    setAdminAuthenticated(false);
    setView("site");
    setLoginError("");
    window.history.replaceState({}, "", "/");
  }

  function handleResetContent() {
    setContent(normalizeSiteContent(siteContentDefaults));
  }

  function handleSaveContent(nextContent) {
    setContent(normalizeSiteContent(nextContent));
  }

  async function handleUpdateCredentials(nextCredentials) {
    const response = await fetch("/api/admin/credentials", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextCredentials),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Unable to update admin credentials.");
    }

    const data = await response.json();
    setAdminProfile((current) => ({
      ...current,
      username: data.user?.username || current.username,
      email: data.user?.email || current.email,
    }));
    setAdminAuthenticated(false);
    setView("site");
    setLoginError("");
  }

  function handleOpenAdmin() {
    if (!adminAuthenticated) return;
    window.history.replaceState({}, "", "/admin");
    setView("admin");
  }

  if (view === "admin") {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <AdminPanel
          content={content}
          adminEmail={adminProfile.email}
          adminUsername={adminProfile.username}
          isAuthenticated={adminAuthenticated}
          loginError={loginError}
          onBackToSite={() => setView("site")}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onResetContent={handleResetContent}
          onSaveContent={handleSaveContent}
          onUpdateCredentials={handleUpdateCredentials}
        />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white">
      <ScrollProgress />
      <BackgroundOrbs />

      <AnimatePresence>{loading ? <LoadingScreen key="loading" /> : null}</AnimatePresence>

      <div className="relative z-10">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSection={activeSection}
          onNavigate={navigateTo}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onAdminOpen={handleOpenAdmin}
          showAdmin={authReady && adminAuthenticated}
          theme={theme}
          onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        />

        <main>
          <AnimatePresence mode="wait">
            {activeTab === "software" ? (
              <motion.div
                key="software-stack"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <SoftwareHero
                  content={content.softwareHero}
                  onProjects={() => navigateTo("projects")}
                  onResumeDownload={downloadResume}
                />
                <SkillsSection
                  heading={content.sectionHeadings.skills}
                  skills={content.softwareSkills}
                />
                <ProjectsSection
                  heading={content.sectionHeadings.projects}
                  projects={content.projects}
                />
                <EducationSection
                  heading={content.sectionHeadings.education}
                  education={content.education}
                />
                <ResumeSection
                  heading={content.sectionHeadings.resume}
                  content={content.resume}
                  onDownload={downloadResume}
                />
                <ContactSection
                  heading={content.sectionHeadings.contact}
                  contactLinks={content.contactLinks}
                />
              </motion.div>
            ) : (
              <motion.div
                key="creative-stack"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <CreativeHero content={content.creativeHero} />
                <VideosSection heading={content.sectionHeadings.videos} videos={content.videos} />
                <DesignsSection heading={content.sectionHeadings.designs} designs={content.designs} />
                <CreativeSkillsSection
                  heading={content.sectionHeadings.creativeSkills}
                  skills={content.creativeSkills}
                />
                <CollaborationSection
                  heading={content.sectionHeadings.collaboration}
                  content={content.collaboration}
                  onWorkTogether={workTogether}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
