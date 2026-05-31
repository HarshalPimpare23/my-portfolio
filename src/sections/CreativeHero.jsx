import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../components/Container";

export default function CreativeHero({ content }) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % content.phrases.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [content.phrases.length]);

  return (
    <section
      id="creative-hero"
      data-section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="relative rounded-[2rem] border border-white/10 bg-white/5 px-5 py-10 shadow-glow sm:px-8 lg:px-10">
          <div className="noise rounded-[2rem]" />
          <div className="relative z-10">
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-300 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-300" />
                  </span>
                  {content.badge}
                </div>

                <div className="space-y-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.4em] text-white/45">
                    {content.modeLabel}
                  </p>
                  <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    {content.title}
                    <span className="block bg-gradient-to-r from-fuchsia-300 via-cyan-200 to-white bg-clip-text text-transparent">
                      {content.accentTitle}
                    </span>
                  </h1>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={phraseIndex}
                      className="max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.35 }}
                    >
                      {content.phrases[phraseIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {content.stats.map((item) => (
                    <div key={item.label} className="glass-strong rounded-3xl p-5">
                      <p className="font-display text-3xl font-bold text-white">{item.value}</p>
                      <p className="mt-2 text-sm text-white/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -right-10 bottom-6 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
                  animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />

                <div className="glass-strong relative overflow-hidden rounded-[2rem] border-white/10 p-5 shadow-glow">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                          Creative Stack
                        </p>
                        <p className="mt-2 font-display text-2xl font-semibold text-white">
                          {content.creativeStackTitle}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold tracking-[0.25em] text-fuchsia-200">
                        {content.creativeStackStatus}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {content.stackItems.map((item) => (
                        <div key={item.label} className="rounded-3xl border border-white/10 bg-black/25 p-4">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                          <p className="mt-3 font-medium text-white/85">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-3xl border border-fuchsia-400/15 bg-fuchsia-400/5 p-5">
                      <p className="text-sm leading-7 text-white/75">
                        {content.summary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
