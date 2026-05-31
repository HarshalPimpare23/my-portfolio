import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "./Container";

function downloadJson(filename, data) {
  const blob = new Blob([data], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function makeOtp() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function passwordChecklist(password) {
  return [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(password) },
    { label: "One number", ok: /[0-9]/.test(password) },
    { label: "One special character", ok: /[^A-Za-z0-9]/.test(password) },
  ];
}

function splitLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinLines(items, mapItem) {
  return items.map(mapItem).join("\n");
}

function parseDelimitedLine(line, count) {
  const parts = line.split("|").map((part) => part.trim());
  while (parts.length < count) parts.push("");
  return parts.slice(0, count);
}

function createSimpleDraft(content) {
  return {
    brandName: content.navigation.brandName,
    brandTag: content.navigation.brandTag,
    softwareHeroBadge: content.softwareHero.badge,
    softwareHeroName: content.softwareHero.name,
    softwareHeroSummary: content.softwareHero.summary,
    softwareHeroPhrases: joinLines(content.softwareHero.phrases, (item) => item),
    softwareHeroStats: joinLines(content.softwareHero.stats, (item) => `${item.value} | ${item.label}`),
    softwareHeroStackItems: joinLines(content.softwareHero.stackItems, (item) => `${item.label} | ${item.value}`),
    softwareLiveStackTitle: content.softwareHero.liveStackTitle,
    softwareLiveStackStatus: content.softwareHero.liveStackStatus,
    creativeHeroBadge: content.creativeHero.badge,
    creativeHeroTitle: content.creativeHero.title,
    creativeHeroAccentTitle: content.creativeHero.accentTitle,
    creativeHeroSummary: content.creativeHero.summary,
    creativeHeroPhrases: joinLines(content.creativeHero.phrases, (item) => item),
    creativeHeroStats: joinLines(content.creativeHero.stats, (item) => `${item.value} | ${item.label}`),
    creativeHeroStackItems: joinLines(content.creativeHero.stackItems, (item) => `${item.label} | ${item.value}`),
    creativeStackTitle: content.creativeHero.creativeStackTitle,
    creativeStackStatus: content.creativeHero.creativeStackStatus,
    sectionHeadingsText: joinLines(Object.entries(content.sectionHeadings), ([key, item]) =>
      `${key} | ${item.eyebrow} | ${item.title} | ${item.description}`
    ),
    softwareSkillsText: joinLines(content.softwareSkills, (item) => `${item.label} | ${item.icon} | ${item.note}`),
    creativeSkillsText: joinLines(content.creativeSkills, (item) => `${item.label} | ${item.icon} | ${item.note}`),
    projectsText: joinLines(content.projects, (item) =>
      `${item.title} | ${item.description} | ${item.tech.join(", ")} | ${item.live} | ${item.github}`
    ),
    designsText: joinLines(content.designs, (item) => `${item.title} | ${item.category}`),
    videosText: joinLines(content.videos, (item) => `${item.title} | ${item.category} | ${item.duration}`),
    educationText: joinLines(content.education, (item) =>
      `${item.school} | ${item.degree} | ${item.year} | ${item.description}`
    ),
    contactLinksText: joinLines(content.contactLinks, (item) =>
      `${item.label} | ${item.value} | ${item.href} | ${item.icon}`
    ),
    collaborationText: `${content.collaboration.eyebrow} | ${content.collaboration.title} | ${content.collaboration.description} | ${content.collaboration.buttonLabel}`,
    resumeText: `${content.resume.eyebrow} | ${content.resume.title} | ${content.resume.description} | ${content.resume.cardEyebrow} | ${content.resume.cardTitle} | ${content.resume.cardDescription} | ${content.resume.buttonLabel}`,
  };
}

function contentFromSimpleDraft(draft, currentContent) {
  const sectionHeadings = {};
  splitLines(draft.sectionHeadingsText).forEach((line) => {
    const [key, eyebrow, title, description] = parseDelimitedLine(line, 4);
    if (key) {
      sectionHeadings[key] = { eyebrow, title, description };
    }
  });

  const softwareSkills = splitLines(draft.softwareSkillsText).map((line, index) => {
    const [label, icon, note] = parseDelimitedLine(line, 3);
    const fallback = currentContent.softwareSkills[index] || {};
    return {
      label: label || fallback.label || "",
      icon: icon || fallback.icon || "",
      note: note || fallback.note || "",
    };
  });

  const creativeSkills = splitLines(draft.creativeSkillsText).map((line, index) => {
    const [label, icon, note] = parseDelimitedLine(line, 3);
    const fallback = currentContent.creativeSkills[index] || {};
    return {
      label: label || fallback.label || "",
      icon: icon || fallback.icon || "",
      note: note || fallback.note || "",
    };
  });

  const projects = splitLines(draft.projectsText).map((line, index) => {
    const [title, description, techText, live, github] = parseDelimitedLine(line, 5);
    const fallback = currentContent.projects[index] || {};
    return {
      title: title || fallback.title || "",
      description: description || fallback.description || "",
      tech: (techText || fallback.tech?.join(", ") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      live: live || fallback.live || "",
      github: github || fallback.github || "",
      artwork: fallback.artwork,
    };
  });

  const designs = splitLines(draft.designsText).map((line, index) => {
    const [title, category] = parseDelimitedLine(line, 2);
    const fallback = currentContent.designs[index] || {};
    return {
      title: title || fallback.title || "",
      category: category || fallback.category || "",
      artwork: fallback.artwork,
    };
  });

  const videos = splitLines(draft.videosText).map((line, index) => {
    const [title, category, duration] = parseDelimitedLine(line, 3);
    const fallback = currentContent.videos[index] || {};
    return {
      title: title || fallback.title || "",
      category: category || fallback.category || "",
      duration: duration || fallback.duration || "",
      artwork: fallback.artwork,
    };
  });

  const education = splitLines(draft.educationText).map((line, index) => {
    const [school, degree, year, description] = parseDelimitedLine(line, 4);
    const fallback = currentContent.education[index] || {};
    return {
      school: school || fallback.school || "",
      degree: degree || fallback.degree || "",
      year: year || fallback.year || "",
      description: description || fallback.description || "",
    };
  });

  const contactLinks = splitLines(draft.contactLinksText).map((line, index) => {
    const [label, value, href, icon] = parseDelimitedLine(line, 4);
    const fallback = currentContent.contactLinks[index] || {};
    return {
      label: label || fallback.label || "",
      value: value || fallback.value || "",
      href: href || fallback.href || "",
      icon: icon || fallback.icon || "",
    };
  });

  const [collabEyebrow, collabTitle, collabDescription, collabButtonLabel] = parseDelimitedLine(
    draft.collaborationText,
    4
  );
  const [resumeEyebrow, resumeTitle, resumeDescription, resumeCardEyebrow, resumeCardTitle, resumeCardDescription, resumeButtonLabel] =
    parseDelimitedLine(draft.resumeText, 7);

  return {
    ...currentContent,
    navigation: {
      brandName: draft.brandName,
      brandTag: draft.brandTag,
    },
    softwareHero: {
      ...currentContent.softwareHero,
      badge: draft.softwareHeroBadge,
      name: draft.softwareHeroName,
      summary: draft.softwareHeroSummary,
      phrases: splitLines(draft.softwareHeroPhrases),
      stats: splitLines(draft.softwareHeroStats).map((line, index) => {
        const [value, label] = parseDelimitedLine(line, 2);
        const fallback = currentContent.softwareHero.stats[index] || {};
        return {
          value: value || fallback.value || "",
          label: label || fallback.label || "",
        };
      }),
      stackItems: splitLines(draft.softwareHeroStackItems).map((line, index) => {
        const [label, value] = parseDelimitedLine(line, 2);
        const fallback = currentContent.softwareHero.stackItems[index] || {};
        return {
          label: label || fallback.label || "",
          value: value || fallback.value || "",
        };
      }),
      liveStackTitle: draft.softwareLiveStackTitle,
      liveStackStatus: draft.softwareLiveStackStatus,
    },
    creativeHero: {
      ...currentContent.creativeHero,
      badge: draft.creativeHeroBadge,
      title: draft.creativeHeroTitle,
      accentTitle: draft.creativeHeroAccentTitle,
      summary: draft.creativeHeroSummary,
      phrases: splitLines(draft.creativeHeroPhrases),
      stats: splitLines(draft.creativeHeroStats).map((line, index) => {
        const [value, label] = parseDelimitedLine(line, 2);
        const fallback = currentContent.creativeHero.stats[index] || {};
        return {
          value: value || fallback.value || "",
          label: label || fallback.label || "",
        };
      }),
      stackItems: splitLines(draft.creativeHeroStackItems).map((line, index) => {
        const [label, value] = parseDelimitedLine(line, 2);
        const fallback = currentContent.creativeHero.stackItems[index] || {};
        return {
          label: label || fallback.label || "",
          value: value || fallback.value || "",
        };
      }),
      creativeStackTitle: draft.creativeStackTitle,
      creativeStackStatus: draft.creativeStackStatus,
    },
    sectionHeadings: Object.fromEntries(
      Object.entries({
        ...currentContent.sectionHeadings,
        ...sectionHeadings,
      }).map(([key, item]) => [key, { ...item }])
    ),
    softwareSkills,
    creativeSkills,
    projects,
    designs,
    videos,
    education,
    contactLinks,
    collaboration: {
      ...currentContent.collaboration,
      eyebrow: collabEyebrow || currentContent.collaboration.eyebrow,
      title: collabTitle || currentContent.collaboration.title,
      description: collabDescription || currentContent.collaboration.description,
      buttonLabel: collabButtonLabel || currentContent.collaboration.buttonLabel,
    },
    resume: {
      ...currentContent.resume,
      eyebrow: resumeEyebrow || currentContent.resume.eyebrow,
      title: resumeTitle || currentContent.resume.title,
      description: resumeDescription || currentContent.resume.description,
      cardEyebrow: resumeCardEyebrow || currentContent.resume.cardEyebrow,
      cardTitle: resumeCardTitle || currentContent.resume.cardTitle,
      cardDescription: resumeCardDescription || currentContent.resume.cardDescription,
      buttonLabel: resumeButtonLabel || currentContent.resume.buttonLabel,
    },
  };
}

export default function AdminPanel({
  content,
  adminEmail,
  adminUsername,
  onBackToSite,
  onSaveContent,
  onResetContent,
  onLogout,
  onLogin,
  onUpdateCredentials,
  loginError,
  isAuthenticated,
}) {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [editorText, setEditorText] = useState(() => JSON.stringify(content, null, 2));
  const [editorError, setEditorError] = useState("");
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);
  const [editorMode, setEditorMode] = useState("simple");
  const [mode, setMode] = useState("login");
  const [resetStep, setResetStep] = useState("request");
  const [resetError, setResetError] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [simpleDraft, setSimpleDraft] = useState(() => createSimpleDraft(content));
  const [resetForm, setResetForm] = useState({
    email: "",
    otp: "",
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setEditorText(JSON.stringify(content, null, 2));
    setSimpleDraft(createSimpleDraft(content));
  }, [content]);

  useEffect(() => {
    setResetForm((current) => ({
      ...current,
      email: adminEmail ?? current.email,
    }));
  }, [adminEmail]);

  const summary = useMemo(
    () => [
      { label: "Sections", value: "Editable JSON" },
      { label: "Storage", value: "localStorage" },
      { label: "Login", value: isAuthenticated ? "Unlocked" : "Locked" },
    ],
    [isAuthenticated]
  );

  const passwordRules = useMemo(
    () => passwordChecklist(resetForm.newPassword),
    [resetForm.newPassword]
  );

  function updateLoginForm(event) {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  }

  function updateResetForm(event) {
    const { name, value } = event.target;
    setResetForm((current) => ({ ...current, [name]: value }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    await onLogin(loginForm.username, loginForm.password);
  }

  function notifySaveSuccess(message = "save updated") {
    setEditorError("");
    setStatus(message);
    showToast(message);
    window.setTimeout(() => setStatus(""), 1800);
  }

  function handleSave() {
    try {
      const parsed = JSON.parse(editorText);
      if (JSON.stringify(parsed) !== JSON.stringify(content)) {
        onSaveContent(parsed);
        notifySaveSuccess();
      } else {
        setStatus("No changes to save.");
        window.setTimeout(() => setStatus(""), 1200);
      }
    } catch {
      setEditorError("The JSON is invalid. Fix the syntax before saving.");
      setStatus("");
    }
  }

  function handleSaveSimple() {
    try {
      const parsed = contentFromSimpleDraft(simpleDraft, content);
      if (JSON.stringify(parsed) !== JSON.stringify(content)) {
        onSaveContent(parsed);
        notifySaveSuccess();
      } else {
        setStatus("No changes to save.");
        window.setTimeout(() => setStatus(""), 1200);
      }
    } catch {
      setEditorError("The simple editor data could not be saved. Check your line formatting.");
      setStatus("");
    }
  }

  function handleSaveSection(sectionKey) {
    try {
      const parsed = contentFromSimpleDraft(simpleDraft, content);
      const labelMap = {
        profile: "Profile",
        softwareHero: "Software Hero",
        creativeHero: "Creative Hero",
        sectionHeadings: "Section Headings",
        lists: "Lists",
        resumeCollab: "Resume & Collab",
      };
      if (JSON.stringify(parsed) !== JSON.stringify(content)) {
        onSaveContent(parsed);
        setStatus(`${labelMap[sectionKey] || "Section"} saved.`);
        showToast("save updated");
      } else {
        setStatus("No changes to save.");
      }
      setEditorError("");
      window.setTimeout(() => setStatus(""), 1600);
    } catch {
      setEditorError("Could not save this section. Check formatting.");
      setStatus("");
    }
  }

  function showToast(message) {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(""), 1600);
  }

  function SaveActionButtons({ label = "Save", onSave }) {
    return (
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onSave}
          className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:w-auto"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onBackToSite}
          className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
        >
          Back to Site
        </button>
      </div>
    );
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(editorText);
      setEditorText(JSON.stringify(parsed, null, 2));
      setEditorError("");
    } catch {
      setEditorError("Cannot format invalid JSON.");
    }
  }

  function handleExport() {
    downloadJson("portfolio-site-content.json", JSON.stringify(content, null, 2));
  }

  function handleSendOtp(event) {
    event.preventDefault();
    setResetError("");
    setResetStatus("");

    if (!adminEmail) {
      setResetError("No admin email is configured yet.");
      return;
    }

    if (resetForm.email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      setResetError("That email does not match the registered admin email.");
      return;
    }

    const otp = makeOtp();
    setGeneratedOtp(otp);
    setResetStep("verify");
    setResetStatus(`OTP generated for ${adminEmail}. Check your inbox or mail app.`);

    const subject = encodeURIComponent("Portfolio Admin OTP");
    const body = encodeURIComponent(
      `Your 4-digit OTP for the portfolio admin reset is: ${otp}\n\nThis code expires when you generate a new one.`
    );

    const mailLink = document.createElement("a");
    mailLink.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    mailLink.style.display = "none";
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);
  }

  function handleVerifyOtp(event) {
    event.preventDefault();
    setResetError("");

    if (resetForm.otp.trim() !== generatedOtp) {
      setResetError("OTP does not match. Please check the code and try again.");
      return;
    }

    setResetStep("set-password");
    setResetStatus("OTP verified. Set your new username and password.");
  }

  async function handleUpdatePassword(event) {
    event.preventDefault();
    setResetError("");

    const rules = passwordChecklist(resetForm.newPassword);
    const allRulesPass = rules.every((rule) => rule.ok);

    if (!resetForm.newUsername.trim()) {
      setResetError("Username is required.");
      return;
    }

    if (resetForm.newUsername.trim().length < 3) {
      setResetError("Username must be at least 3 characters.");
      return;
    }

    if (!allRulesPass) {
      setResetError("Password does not meet the required format.");
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setResetError("Both password fields must match.");
      return;
    }

    try {
      await onUpdateCredentials({
        username: resetForm.newUsername.trim(),
        password: resetForm.newPassword,
        email: adminEmail,
      });
    } catch (error) {
      setResetError(error?.message || "Could not update admin credentials.");
      return;
    }

    setMode("login");
    setResetStep("request");
    setGeneratedOtp("");
    setResetForm({
      email: adminEmail ?? "",
      otp: "",
      newUsername: "",
      newPassword: "",
      confirmPassword: "",
    });
    setResetStatus("Credentials updated. Please log in again with the new username and password.");
  }

  function renderPasswordField({ name, value, onChange, placeholder, showValue, toggleShow }) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 focus-within:border-cyan-400/40">
        <input
          name={name}
          type={showValue ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-3 pl-4 pr-16 text-white outline-none transition placeholder:text-white/30"
          placeholder={placeholder}
          autoComplete={name}
          required
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:bg-white/10 hover:text-white"
          aria-label={showValue ? "Hide password" : "Show password"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {showValue ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    );
  }

  function renderSimpleInput(label, field, placeholder = "") {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">{label}</span>
        <input
          value={simpleDraft[field]}
          onChange={(event) =>
            setSimpleDraft((current) => ({ ...current, [field]: event.target.value }))
          }
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
        />
      </label>
    );
  }

  function renderSimpleTextarea(label, field, placeholder = "", rows = 5) {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/75">{label}</span>
        <textarea
          value={simpleDraft[field]}
          onChange={(event) =>
            setSimpleDraft((current) => ({ ...current, [field]: event.target.value }))
          }
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
        />
      </label>
    );
  }

  function renderResetFlow() {
    if (resetStep === "request") {
      return (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 1 of 3</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">Request OTP</h2>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Enter the registered email address and we&apos;ll generate a 4-digit OTP for password reset.
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/75">Registered email</span>
            <input
              name="email"
              type="email"
              value={resetForm.email}
              onChange={updateResetForm}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
              placeholder={adminEmail ?? "admin@example.com"}
              autoComplete="email"
              required
            />
          </label>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Password format</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>At least 8 characters</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>At least 1 special character</li>
            </ul>
          </div>

          {resetError ? (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {resetError}
            </p>
          ) : null}

          {resetStatus ? (
            <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              {resetStatus}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Send OTP
            </button>
            <button
              type="button"
              onClick={() => setMode("login")}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Back to login
            </button>
          </div>
        </form>
      );
    }

    if (resetStep === "verify") {
      return (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 2 of 3</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">Verify OTP</h2>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Enter the 4-digit code sent to <span className="font-semibold">{adminEmail}</span>.
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/35">
              Local demo OTP: {generatedOtp}
            </p>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/75">4-digit OTP</span>
            <input
              name="otp"
              value={resetForm.otp}
              onChange={updateResetForm}
              inputMode="numeric"
              maxLength={4}
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
              placeholder="1234"
              required
            />
          </label>

          {resetError ? (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {resetError}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={() => {
                setResetStep("request");
                setResetError("");
                setResetStatus("");
                setGeneratedOtp("");
                setResetForm((current) => ({ ...current, otp: "" }));
              }}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Resend OTP
            </button>
          </div>
        </form>
      );
    }

    return (
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <div className="rounded-3xl border border-cyan-400/15 bg-cyan-400/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Step 3 of 3</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white">Set new password</h2>
          <p className="mt-2 text-sm leading-7 text-white/65">
            Create a new username and enter the new password twice to update the admin login.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/75">New username</span>
          <input
            name="newUsername"
            value={resetForm.newUsername}
            onChange={updateResetForm}
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
            placeholder="new-admin"
            autoComplete="username"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/75">New password</span>
          {renderPasswordField({
            name: "newPassword",
            value: resetForm.newPassword,
            onChange: updateResetForm,
            placeholder: "Create a strong password",
            showValue: showResetPassword,
            toggleShow: () => setShowResetPassword((current) => !current),
          })}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-white/75">Confirm password</span>
          {renderPasswordField({
            name: "confirmPassword",
            value: resetForm.confirmPassword,
            onChange: updateResetForm,
            placeholder: "Re-enter your password",
            showValue: showResetConfirm,
            toggleShow: () => setShowResetConfirm((current) => !current),
          })}
        </label>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Password checklist</p>
          <ul className="mt-3 space-y-2 text-sm">
            {passwordRules.map((rule) => (
              <li key={rule.label} className={rule.ok ? "text-emerald-200" : "text-white/60"}>
                {rule.ok ? "Check" : "-"} {rule.label}
              </li>
            ))}
          </ul>
        </div>

        {resetError ? (
          <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {resetError}
          </p>
        ) : null}

        {resetStatus ? (
          <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
            {resetStatus}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Update Credentials
          </button>
          <button
            type="button"
            onClick={() => {
              setResetStep("request");
              setGeneratedOtp("");
              setResetForm({
                email: adminEmail ?? "",
                otp: "",
                newUsername: "",
                newPassword: "",
                confirmPassword: "",
              });
              setResetError("");
              setResetStatus("");
            }}
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Start over
          </button>
        </div>
      </form>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0f0f0f] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_right,rgba(34,211,238,0.14),transparent_26%)]" />
        <Container className="relative z-10 flex min-h-screen items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-strong w-full max-w-xl rounded-[2rem] border-white/10 p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                  Admin Access
                </p>
                <h1 className="mt-3 font-display text-3xl font-semibold">Unlock the editor</h1>
              </div>
              <button
                type="button"
                onClick={onBackToSite}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
              >
                Back to site
              </button>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/65">
              Sign in to edit the portfolio content. If you forgot the password, use the reset flow below.
            </p>

            <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.24em] transition ${
                  mode === "login" ? "bg-white text-black" : "text-white/65 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("reset")}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.24em] transition ${
                  mode === "reset" ? "bg-white text-black" : "text-white/65 hover:text-white"
                }`}
              >
                Forgot Password
              </button>
            </div>

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="mt-8 space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-white/75">Username</span>
                  <input
                    name="username"
                    value={loginForm.username}
                    onChange={updateLoginForm}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
                    placeholder={adminUsername ?? "admin"}
                    autoComplete="username"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-white/75">Password</span>
                  {renderPasswordField({
                    name: "password",
                    value: loginForm.password,
                    onChange: updateLoginForm,
                    placeholder: "Enter password",
                    showValue: showLoginPassword,
                    toggleShow: () => setShowLoginPassword((current) => !current),
                  })}
                </label>

                {loginError ? (
                  <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {loginError}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-[20px]">lock_open</span>
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("reset")}
                    className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                  >
                    Forgot password
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 space-y-5">
                {renderResetFlow()}
              </div>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {summary.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                  <p className="mt-3 text-sm font-medium text-white/85">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0f0f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_right,rgba(34,211,238,0.13),transparent_24%)]" />
      <Container className="relative z-10 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-strong overflow-hidden rounded-[2rem] border-white/10"
        >
          <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">Admin Dashboard</p>
              <h1 className="mt-2 font-display text-3xl font-semibold">Portfolio content manager</h1>
              <p className="mt-2 text-sm text-white/60">
                Edit the whole site as JSON, then save the result into this browser.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleFormat}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
              >
                Format JSON
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
              >
                Export
              </button>
              <button
                type="button"
                onClick={onResetContent}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-400/15"
              >
                Reset Content
              </button>
              <button
                type="button"
                onClick={onBackToSite}
                className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Back to Site
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Toast popup */}
            {toast ? (
              <div className="fixed right-6 top-6 z-50">
                <div className="rounded-full bg-emerald-500/95 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  {toast}
                </div>
              </div>
            ) : null}
            <div className="space-y-4">
              {summary.map((item) => (
                <div key={item.label} className="glass rounded-3xl border-white/10 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
              <div className="rounded-[1.75rem] border border-cyan-400/15 bg-cyan-400/5 p-5">
                <p className="text-sm leading-7 text-white/70">
                  Tip: this editor stores changes locally in your browser. If you want the admin system to work
                  across devices, we can connect it to a backend next.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white/70">Simple Editor</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/35">Easy fields first</p>
              </div>
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Profile</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderSimpleInput("Brand name", "brandName", "Harshal Pimpare")}
                    {renderSimpleInput("Brand tag", "brandTag", "Futuristic portfolio")}
                  </div>
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("profile")} />
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Software Hero</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderSimpleInput("Badge", "softwareHeroBadge")}
                    {renderSimpleInput("Name", "softwareHeroName")}
                  </div>
                  {renderSimpleTextarea("Summary", "softwareHeroSummary", "", 3)}
                  {renderSimpleTextarea("Phrases", "softwareHeroPhrases", "One phrase per line", 4)}
                  {renderSimpleTextarea(
                    "Stats",
                    "softwareHeroStats",
                    "value | label per line",
                    3
                  )}
                  {renderSimpleTextarea(
                    "Stack items",
                    "softwareHeroStackItems",
                    "label | value per line",
                    4
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderSimpleInput("Live stack title", "softwareLiveStackTitle")}
                    {renderSimpleInput("Live stack status", "softwareLiveStackStatus")}
                  </div>
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("softwareHero")} />
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Creative Hero</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderSimpleInput("Badge", "creativeHeroBadge")}
                    {renderSimpleInput("Title", "creativeHeroTitle")}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {renderSimpleInput("Accent title", "creativeHeroAccentTitle")}
                    {renderSimpleInput("Stack title", "creativeStackTitle")}
                  </div>
                  {renderSimpleTextarea("Summary", "creativeHeroSummary", "", 3)}
                  {renderSimpleTextarea("Phrases", "creativeHeroPhrases", "One phrase per line", 4)}
                  {renderSimpleTextarea("Stats", "creativeHeroStats", "value | label per line", 3)}
                  {renderSimpleTextarea(
                    "Stack items",
                    "creativeHeroStackItems",
                    "label | value per line",
                    4
                  )}
                  {renderSimpleInput("Stack status", "creativeStackStatus")}
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("creativeHero")} />
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Section Headings</p>
                  {renderSimpleTextarea(
                    "headingKey | eyebrow | title | description",
                    "sectionHeadingsText",
                    "skills | Software Section | Skills | Description",
                    10
                  )}
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("sectionHeadings")} />
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Lists</p>
                  {renderSimpleTextarea(
                    "Software skills",
                    "softwareSkillsText",
                    "label | icon | note per line",
                    6
                  )}
                  {renderSimpleTextarea(
                    "Creative skills",
                    "creativeSkillsText",
                    "label | icon | note per line",
                    5
                  )}
                  {renderSimpleTextarea(
                    "Projects",
                    "projectsText",
                    "title | description | tech1, tech2 | live | github",
                    8
                  )}
                  {renderSimpleTextarea("Designs", "designsText", "title | category", 7)}
                  {renderSimpleTextarea("Videos", "videosText", "title | category | duration", 7)}
                  {renderSimpleTextarea(
                    "Education",
                    "educationText",
                    "school | degree | year | description",
                    5
                  )}
                  {renderSimpleTextarea(
                    "Contact links",
                    "contactLinksText",
                    "label | value | href | icon",
                    4
                  )}
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("lists")} />
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Resume & Collab</p>
                  {renderSimpleTextarea(
                    "Collaboration",
                    "collaborationText",
                    "eyebrow | title | description | buttonLabel",
                    3
                  )}
                  {renderSimpleTextarea(
                    "Resume",
                    "resumeText",
                    "eyebrow | title | description | cardEyebrow | cardTitle | cardDescription | buttonLabel",
                    3
                  )}
                  <SaveActionButtons label="Save" onSave={() => handleSaveSection("resumeCollab")} />
                </div>

                {editorError ? (
                  <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {editorError}
                  </p>
                ) : null}
                {status ? (
                  <p className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                    {status}
                  </p>
                ) : null}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleSaveSimple}
                    className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 sm:w-auto"
                  >
                    Save Simple Changes
                  </button>
                  <button
                    type="button"
                    onClick={onBackToSite}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
                  >
                    Back to Site
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimpleDraft(createSimpleDraft(content))}
                    className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
                  >
                    Reset Form
                  </button>
                </div>

                <details className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-white/75">
                    Advanced JSON
                  </summary>
                  <div className="mt-4 space-y-4">
                    <textarea
                      value={editorText}
                      onChange={(event) => setEditorText(event.target.value)}
                      spellCheck="false"
                      className="min-h-[420px] w-full rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-4 font-mono text-[13px] leading-6 text-white/85 outline-none transition placeholder:text-white/30 focus:border-cyan-400/40"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <button
                        type="button"
                        onClick={handleSave}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
                      >
                        Save JSON
                      </button>
                      <button
                        type="button"
                        onClick={onBackToSite}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
                      >
                        Back to Site
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditorText(JSON.stringify(content, null, 2))}
                        className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 sm:w-auto"
                      >
                        Revert JSON
                      </button>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
