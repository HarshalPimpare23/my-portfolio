import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-violet-500"
      style={{ scaleX: scrollYProgress, width: "100%" }}
    />
  );
}
