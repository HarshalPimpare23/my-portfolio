import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";

export default function CollaborationSection({ heading, content, onWorkTogether }) {
  return (
    <section id="collab" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-strong overflow-hidden rounded-[2.25rem] border-white/10 p-8 sm:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                  {heading.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {heading.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">{heading.description}</p>
              </div>

              <div className="flex lg:justify-end">
                <button
                  type="button"
                  onClick={onWorkTogether}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                  {content.buttonLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
