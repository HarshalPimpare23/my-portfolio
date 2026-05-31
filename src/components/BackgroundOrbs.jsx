import { motion } from "framer-motion";

export default function BackgroundOrbs() {
  const orbs = [
    { className: "left-[4%] top-[14%] h-72 w-72 bg-fuchsia-500/20", duration: 12 },
    { className: "right-[6%] top-[18%] h-96 w-96 bg-cyan-400/15", duration: 15 },
    { className: "left-[20%] bottom-[10%] h-80 w-80 bg-violet-500/10", duration: 18 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.className}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={{ y: [0, -24, 0], x: [0, 18, 0] }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_30%)]" />
    </div>
  );
}
