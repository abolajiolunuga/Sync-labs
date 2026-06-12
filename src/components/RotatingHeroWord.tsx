"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import "./rotating-hero-word.css";

const roles = ["Editors", "Filmmakers", "Creators", "Marketers", "Educators", "Studios"];

export function RotatingHeroWord() {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % roles.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className="rotating-hero-word">{roles[0]}</span>;
  }

  return (
    <span className="rotating-hero-word" aria-live="polite">
      <AnimatePresence mode="popLayout">
        <motion.span
          className="rotating-hero-word-item"
          key={roles[index]}
          initial={{ opacity: 0, x: "-50%", y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: "-50%", y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: "-50%", y: -24, filter: "blur(10px)" }}
          transition={{
            duration: 0.64,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
