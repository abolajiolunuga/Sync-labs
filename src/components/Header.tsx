"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import "./header.css";

type HeaderTheme = "light" | "dark";

type HeaderProps = {
  theme?: HeaderTheme;
};

export function Header({ theme = "light" }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isOverDarkSection, setIsOverDarkSection] = useState(theme === "dark");
  const isDark = theme === "dark" || isOverDarkSection;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const topBuffer = 24;
    const directionThreshold = 6;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const distance = currentScrollY - lastScrollY;
      const darkSection = document.querySelector<HTMLElement>(".scenario-band");
      const navProbeY = 32;

      if (theme !== "dark" && darkSection) {
        const sectionRect = darkSection.getBoundingClientRect();
        setIsOverDarkSection(sectionRect.top <= navProbeY && sectionRect.bottom >= navProbeY);
      }

      if (currentScrollY <= topBuffer) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(distance) < directionThreshold) {
        return;
      }

      setIsVisible(distance < 0);
      lastScrollY = currentScrollY;
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [theme]);

  return (
    <header className={`site-header ${isDark ? "site-header-dark" : "site-header-light"} ${isVisible ? "is-visible" : "is-hidden"}`}>
      <div className="site-header-inner">
        <div className="header-left">
          <a className="brand" href="/" aria-label="sync.labs home">
            <img className="brand-logo brand-logo-light" src="/nav-bar-logo.svg" alt="sync.labs" />
            <img className="brand-logo brand-logo-dark" src="/nav-bar-logo-dark.svg" alt="" aria-hidden="true" />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#">
              Product
              <img className="nav-caret" src="/caret-down.svg" alt="" aria-hidden="true" />
            </a>
            <a href="#">Studio</a>
            <a href="#">Pricing</a>
          </nav>
        </div>

        <div className="header-actions">
          <Button variant={isDark ? "dark-secondary" : "secondary"}>
            Log in
          </Button>
          <Button>Get started</Button>
          <button className="mobile-menu-button" type="button" aria-label="Open menu">
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
