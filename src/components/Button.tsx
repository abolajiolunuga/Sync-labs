"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import "./button.css";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "dark-secondary";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
};

export type ButtonProps = BaseProps & {
  href?: string;
  onClick?: () => void;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = `button button-${variant} ${className}`.trim();

  if (href) {
    return (
      <motion.a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>{children}</span>
    </motion.button>
  );
}
