"use client";

import { useEffect, useRef, useState } from "react";

export function FooterWordmarkReveal() {
  const wordmarkRef = useRef<HTMLPictureElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const wordmark = wordmarkRef.current;

    if (!wordmark) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    observer.observe(wordmark.parentElement ?? wordmark);

    return () => observer.disconnect();
  }, []);

  return (
    <picture ref={wordmarkRef} className={`footer-wordmark-picture${isVisible ? " is-visible" : ""}`}>
      <source media="(max-width: 720px)" srcSet="/footer-logo-mobile.svg" />
      <img className="footer-wordmark" src="/footer-logo-desktop.svg" alt="sync.labs" />
    </picture>
  );
}
