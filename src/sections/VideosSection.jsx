import { motion } from "framer-motion";
import Container from "../components/Container";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { artworkToImage } from "../data/siteContent";

export default function VideosSection({ heading, videos }) {
  return (
    <section id="videos" data-section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {videos.map((video, index) => (
            <Reveal key={video.title} delay={index * 0.04}>
              <motion.article
                whileHover={{ y: -8 }}
                className="glass group overflow-hidden rounded-[2rem] border-white/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={artworkToImage(video.artwork)}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/12 to-transparent" />
                  <motion.div
                    className="absolute inset-0 grid place-items-center"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-fuchsia-500/20">
                      <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/50">
                      {video.category}
                    </span>
                    <span className="text-xs text-white/45">{video.duration}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{video.title}</h3>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
