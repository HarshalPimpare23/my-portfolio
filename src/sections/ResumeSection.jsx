import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function ResumeSection({ heading, content, onDownload }) {
  return (
    <section id="resume" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-strong mt-10 overflow-hidden rounded-[2rem] border-white/10 p-6 sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                  {content.cardEyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">{content.cardTitle}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                  {content.cardDescription}
                </p>
              </div>

              <div className="flex lg:justify-end">
                <button
                  type="button"
                  onClick={onDownload}
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
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
