import { AnimatePresence, motion } from "framer-motion";

const softwareLinks = [
  { label: "Home", id: "software-hero" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const creativeLinks = [
  { label: "Home", id: "creative-hero" },
  { label: "Videos", id: "videos" },
  { label: "Designs", id: "designs" },
  { label: "Skills", id: "creative-skills" },
  { label: "Collab", id: "collab" },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  activeSection,
  onNavigate,
  mobileOpen,
  setMobileOpen,
  onAdminOpen,
  showAdmin = false,
  theme = "dark",
  onToggleTheme,
}) {
  const links = activeTab === "software" ? softwareLinks : creativeLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f0f]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate(activeTab === "software" ? "software-hero" : "creative-hero")}
          className="flex items-center gap-3 text-left"
          type="button"
        >
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/20">
            <span className="material-symbols-outlined text-[24px] text-white">auto_awesome</span>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-white/55">
              Harshal Pimpare
            </p>
            <p className="text-xs text-white/45">Futuristic portfolio</p>
          </div>
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            {["software", "creative"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileOpen(false);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.24em] transition ${
                  activeTab === tab ? "bg-white text-black" : "text-white/65 hover:text-white"
                }`}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          {showAdmin ? (
            <button
              type="button"
              onClick={onAdminOpen}
              className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100 transition hover:bg-fuchsia-400/15"
            >
              Admin
            </button>
          ) : null}
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 transition hover:bg-white/10"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
                type="button"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
          type="button"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="border-t border-white/10 bg-[#0f0f0f]/95 px-4 py-4 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto max-w-7xl space-y-4">
              <div className="flex gap-2">
                {["software", "creative"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setMobileOpen(false);
                    }}
                    className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] ${
                      activeTab === tab ? "bg-white text-black" : "bg-white/5 text-white/60"
                    }`}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {links.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setMobileOpen(false);
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm ${
                        isActive
                          ? "border-cyan-400/40 bg-cyan-400/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70"
                      }`}
                      type="button"
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
              {showAdmin ? (
                <button
                  type="button"
                  onClick={() => {
                    onAdminOpen?.();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-2xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100"
                >
                  Open Admin
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  onToggleTheme?.();
                  setMobileOpen(false);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.22em] text-white/75"
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
