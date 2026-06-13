"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";

const USE_CASE_ROW_HEIGHT = 560;
const USE_CASE_ROW_START_OFFSET = 760;
const USE_CASE_ENTRY_DISTANCE = 380;
const USE_CASE_FINAL_EXIT_DISTANCE = 281;
const USE_CASE_SECTION_END_GAP = 240;

export type UseCaseItem = {
  title: string;
  copy: string;
  action: string;
  image: string;
};

type UseCaseSectionProps = {
  useCases: UseCaseItem[];
};

type UseCaseRowProps = {
  item: UseCaseItem;
  index: number;
  rowHeight: number;
  trackY: MotionValue<number>;
  shouldRevealNextMedia: boolean;
  nextItem?: UseCaseItem;
  isMobileActive: boolean;
};

type MobileUseCaseCardProps = {
  direction: number;
  index: number;
  item: UseCaseItem;
};

const mobileUseCaseMotion = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "100%" : "-100%",
    filter: "blur(8px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? "-100%" : "100%",
    filter: "blur(8px)",
  }),
};

function MobileUseCaseCard({ direction, index, item }: MobileUseCaseCardProps) {
  return (
    <motion.article
      animate="center"
      className="use-case-mobile-card"
      custom={direction}
      exit="exit"
      initial="enter"
      key={item.title}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      variants={mobileUseCaseMotion}
    >
      <div className="use-case-current-media-mask">
        <div className="use-case-current-media-parallax">
          <div className={`use-case-media use-case-media-${index + 1}`} aria-hidden="true">
            <img src={item.image} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <div className="use-case-title-container">
        <h3>{item.title}</h3>
      </div>
      <div className="use-case-body-container">
        <div className="use-case-detail">
          <p>{item.copy}</p>
          <a href="#">
            {item.action}
            <img src="/arrow.svg" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function UseCaseRow({ item, index, isMobileActive, nextItem, rowHeight, shouldRevealNextMedia, trackY }: UseCaseRowProps) {
  const mediaCounterY = useTransform(trackY, (latestY) => -latestY - index * rowHeight - USE_CASE_ROW_START_OFFSET);

  return (
    <article className={`use-case-item ${isMobileActive ? "is-mobile-active" : ""}`}>
      <div className="use-case-current-media-mask">
        <motion.div className="use-case-current-media-parallax" style={{ x: "-50%", y: mediaCounterY }}>
          <div className={`use-case-media use-case-media-${index + 1}`} aria-hidden="true">
            <img src={item.image} alt="" loading="lazy" decoding="async" />
          </div>
        </motion.div>
      </div>

      {shouldRevealNextMedia && nextItem ? (
        <div className="use-case-media-mask">
          <motion.div className="use-case-media-parallax" style={{ x: "-50%", y: mediaCounterY }}>
            <div className={`use-case-media use-case-media-${index + 2}`} aria-hidden="true">
              <img src={nextItem.image} alt="" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      ) : null}

      <div className="use-case-title-container">
        <h3>{item.title}</h3>
      </div>
      <div className="use-case-slider" />
      <div className="use-case-body-container">
        <div className="use-case-detail">
          <p>{item.copy}</p>
          <a href="#">
            {item.action}
            <img src="/arrow.svg" alt="" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function UseCaseSection({ useCases }: UseCaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileDirection, setMobileDirection] = useState(1);
  const rowHeight = USE_CASE_ROW_HEIGHT;
  const transitionCount = Math.max(useCases.length - 2, 0);
  const totalScrollDistance = USE_CASE_ENTRY_DISTANCE + rowHeight * transitionCount + USE_CASE_FINAL_EXIT_DISTANCE;
  const totalPinnedDistance = totalScrollDistance + USE_CASE_SECTION_END_GAP;
  const trackEndProgress = totalScrollDistance / totalPinnedDistance;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackY = useTransform(
    scrollYProgress,
    [0, trackEndProgress, 1],
    [0, -totalScrollDistance, -totalScrollDistance],
  );
  const showPreviousUseCase = () => {
    setMobileDirection(-1);
    setMobileActiveIndex((currentIndex) => (currentIndex - 1 + useCases.length) % useCases.length);
  };
  const showNextUseCase = () => {
    setMobileDirection(1);
    setMobileActiveIndex((currentIndex) => (currentIndex + 1) % useCases.length);
  };

  return (
    <section
      className="use-case-section"
      ref={sectionRef}
      style={
        {
          "--use-case-scroll-steps": useCases.length - 1,
          "--use-case-transition-steps": transitionCount,
        } as CSSProperties & Record<"--use-case-scroll-steps" | "--use-case-transition-steps", number>
      }
    >
      <div className="use-case-sticky-stage">
          <div className="use-case-inner">
        <div className="use-case-base-media" aria-hidden="true">
          <img src={useCases[0].image} alt="" loading="lazy" decoding="async" />
        </div>
          <motion.div className="use-case-list" style={{ y: trackY }}>
            {useCases.map((item, index) => (
              <UseCaseRow
                index={index}
                isMobileActive={index === mobileActiveIndex}
                item={item}
                key={item.title}
                nextItem={useCases[index + 1]}
                rowHeight={rowHeight}
                shouldRevealNextMedia={index < useCases.length - 1}
                trackY={trackY}
              />
            ))}
          </motion.div>
          <div className="use-case-mobile-panel" aria-live="polite">
            <AnimatePresence custom={mobileDirection} initial={false}>
              <MobileUseCaseCard
                direction={mobileDirection}
                index={mobileActiveIndex}
                item={useCases[mobileActiveIndex]}
                key={useCases[mobileActiveIndex].title}
              />
            </AnimatePresence>
          </div>
          <div className="use-case-mobile-controls" aria-label="Use case switcher">
            <button type="button" aria-label="Previous use case" onClick={showPreviousUseCase}>
              <span aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next use case" onClick={showNextUseCase}>
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
