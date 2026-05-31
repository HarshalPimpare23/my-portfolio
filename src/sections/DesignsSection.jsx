import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { artworkToImage } from "../data/siteContent";

export default function DesignsSection({ heading, designs }) {
  return (
    <section id="designs" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="mt-10 columns-1 gap-6 sm:columns-2 xl:columns-3">
          {designs.map((design, index) => (
            <Reveal key={design.title} delay={index * 0.03} className="mb-6 break-inside-avoid">
              <motion.article
                whileHover={{ y: -6 }}
                className="glass group overflow-hidden rounded-[2rem] border-white/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={artworkToImage(design.artwork)}
                    alt={design.title}
                    className="h-auto w-full transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="space-y-2 p-5">
                  <span className="text-xs uppercase tracking-[0.25em] text-white/45">{design.category}</span>
                  <h3 className="font-display text-xl font-semibold text-white">{design.title}</h3>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
