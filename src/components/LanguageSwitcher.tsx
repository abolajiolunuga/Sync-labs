"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./language-switcher.css";

const languages = [
  {
    label: "English",
    flag: "https://www.figma.com/api/mcp/asset/3118f266-d829-413b-a588-ac3190f7c895",
    labelWidth: 47,
  },
  {
    label: "Spanish",
    flag: "https://www.figma.com/api/mcp/asset/32ec7e1f-090c-4774-ad6b-6db668701322",
    labelWidth: 52,
  },
  {
    label: "French",
    flag: "https://www.figma.com/api/mcp/asset/a8ea7ce5-4160-4afd-b2a1-1711a86af810",
    labelWidth: 45,
  },
  {
    label: "Chinese",
    flag: "https://www.figma.com/api/mcp/asset/42ab7bc5-9e78-4b50-9811-9f9591ead91f",
    labelWidth: 54,
  },
];

export function LanguageSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="language-switcher" role="tablist" aria-label="Video language">
      {languages.map((language, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            className={`language-option ${isActive ? "is-active" : ""}`}
            key={language.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={language.label}
            onClick={() => setActiveIndex(index)}
          >
            <span className="language-flag">
              <img src={language.flag} alt="" aria-hidden="true" />
            </span>
            <motion.span
              className="language-label-mask"
              animate={{ width: isActive ? language.labelWidth + 12 : 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="language-label">{language.label}</span>
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}

export function HeroLanguageDock() {
  const languageTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const languageTrack = languageTrackRef.current;

    if (!languageTrack) {
      return;
    }

    const gap = 40;

    const updateLanguageTrack = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const darkSection = document.querySelector<HTMLElement>(".scenario-band");

      if (!hero || !darkSection) {
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const darkSectionRect = darkSection.getBoundingClientRect();
      const languageTrackHeight = languageTrack.offsetHeight;
      const visualViewport = window.visualViewport;
      const viewportHeight = visualViewport?.height ?? window.innerHeight;
      const viewportOffsetTop = visualViewport?.offsetTop ?? 0;
      const viewportBottom = viewportOffsetTop + viewportHeight;
      const viewportPosition = viewportBottom - gap - languageTrackHeight;
      const boundaryPosition = darkSectionRect.top - gap - languageTrackHeight;
      const nextTop = Math.min(viewportPosition, boundaryPosition);
      const isHeroVisible = heroRect.top < viewportHeight && heroRect.bottom > 0;
      const isAboveDarkSection = nextTop + languageTrackHeight <= darkSectionRect.top - gap + 0.5;

      languageTrack.style.top = `${nextTop}px`;
      languageTrack.style.opacity = isHeroVisible && isAboveDarkSection ? "1" : "0";
      languageTrack.style.pointerEvents = isHeroVisible && isAboveDarkSection ? "auto" : "none";
    };

    updateLanguageTrack();

    window.addEventListener("scroll", updateLanguageTrack, { passive: true });
    window.addEventListener("resize", updateLanguageTrack);
    window.visualViewport?.addEventListener("resize", updateLanguageTrack);
    window.visualViewport?.addEventListener("scroll", updateLanguageTrack);

    return () => {
      window.removeEventListener("scroll", updateLanguageTrack);
      window.removeEventListener("resize", updateLanguageTrack);
      window.visualViewport?.removeEventListener("resize", updateLanguageTrack);
      window.visualViewport?.removeEventListener("scroll", updateLanguageTrack);
    };
  }, []);

  return (
    <div className="hero-language-track" ref={languageTrackRef} aria-hidden={false}>
      <div className="hero-language-dock">
        <LanguageSwitcher />
      </div>
    </div>
  );
}
