import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f0f0f]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-cyan-400/40 border-t-fuchsia-500/80"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
          />
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 blur-xl opacity-60" />
        </div>
        <p className="font-display text-lg tracking-[0.25em] text-white/80">LOADING</p>
      </div>
    </motion.div>
  );
}
