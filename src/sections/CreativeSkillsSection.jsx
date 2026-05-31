import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";

export default function CreativeSkillsSection({ heading, skills }) {
  return (
    <section id="creative-skills" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <Reveal key={skill.label} delay={index * 0.03}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass group rounded-[1.75rem] border-white/10 p-5"
              >
                <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-fuchsia-200 transition group-hover:bg-fuchsia-400/10">
                    <Icon name={skill.icon} className="h-6 w-6 text-[22px]" alt={skill.label} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{skill.label}</h3>
                    <p className="text-sm text-white/55">{skill.note}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
