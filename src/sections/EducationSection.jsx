import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function EducationSection({ heading, education }) {
  return (
    <section id="education" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-fuchsia-500 via-cyan-400 to-transparent sm:left-7" />

          <div className="space-y-6">
            {education.map((item, index) => (
              <Reveal key={item.school} delay={index * 0.04}>
                <div className="relative pl-14 sm:pl-20">
                  <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-cyan-400/30 bg-[#101010] text-cyan-200 shadow-glow sm:h-14 sm:w-14">
                    <span className="material-symbols-outlined text-[22px] sm:text-[26px]">school</span>
                  </div>
                  <div className="glass rounded-[2rem] border-white/10 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-white">{item.school}</h3>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/45">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-cyan-200">{item.degree}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
