"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ECellSpinner from "./ECellSpinner";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while the initial loading spinner is displayed
    document.body.style.overflow = "hidden";

    // Intentional 1.6s delay to allow the full E-Cell logo trace animation to display
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050608] select-none"
        >
          {/* Ambient navy glow behind the spinner */}
          <div className="absolute h-80 w-80 rounded-full bg-navy-600/30 blur-[100px] animate-pulse pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <div className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 shadow-glow backdrop-blur-xl">
              <ECellSpinner className="size-16 sm:size-20" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mt-6 font-display text-lg font-bold tracking-[0.2em] uppercase text-gradient"
            >
              Illuminate 3.0
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mt-1.5 text-xs font-medium tracking-widest uppercase text-mist/50"
            >
              E-Cell MESWCOE × E-Cell IIT Bombay
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
