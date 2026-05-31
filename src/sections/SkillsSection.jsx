import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";

export default function SkillsSection({ heading, skills }) {
  return (
    <section id="skills" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <Reveal key={skill.label} delay={index * 0.03}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass group rounded-3xl border-white/10 p-5 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-cyan-200 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-100">
                    <Icon name={skill.icon} className="h-6 w-6 text-[24px]" alt={skill.label} />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/40">
                    Skill
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">{skill.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{skill.note}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
