"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./video-cursor.css";

type CursorPosition = {
  x: number;
  y: number;
};

type VideoCursorProps = {
  isMuted?: boolean;
  onToggleMuted?: () => void;
};

export function VideoCursor({ isMuted: controlledIsMuted, onToggleMuted }: VideoCursorProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [uncontrolledIsMuted, setUncontrolledIsMuted] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const isMuted = controlledIsMuted ?? uncontrolledIsMuted;

  const updatePosition = (clientX: number, clientY: number) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const y = Math.min(Math.max(clientY - rect.top, 0), rect.height);

    setPosition({ x, y });
  };

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const toggleMuted = () => {
    if (onToggleMuted) {
      onToggleMuted();
      return;
    }

    setUncontrolledIsMuted((currentValue) => !currentValue);
  };

  return (
    <div
      className="video-cursor-layer"
      ref={containerRef}
      onMouseEnter={(event) => {
        updatePosition(event.clientX, event.clientY);
        setIsHovering(true);
      }}
      onMouseMove={(event) => updatePosition(event.clientX, event.clientY)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => {
        setIsPressed(false);
        toggleMuted();
      }}
      role="button"
      aria-label={isMuted ? "Unmute video" : "Mute video"}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleMuted();
        }
      }}
    >
      <AnimatePresence>
        {isHovering ? (
          <motion.div
            className="video-cursor-anchor"
            initial={{ opacity: 0, scale: 0.96, filter: "blur(10px)", x: position.x, y: position.y }}
            animate={{
              opacity: 1,
              scale: isPressed ? 0.95 : 1,
              filter: "blur(0px)",
              x: position.x,
              y: position.y,
            }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            transition={{
              opacity: { duration: 0.2, ease: "easeOut" },
              scale: { duration: 0.2, ease: "easeOut" },
              filter: { duration: 0.2, ease: "easeOut" },
              x: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="video-cursor-pill">
              <img src={isMuted ? "/unmute.svg" : "/mute.svg"} alt="" aria-hidden="true" />
              <span>{isMuted ? "Unmute" : "Mute"}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
