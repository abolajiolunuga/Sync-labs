"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import type { CSSProperties } from "react";
import { useRef } from "react";

const SCENARIO_ROW_HEIGHT = 640;
const SCENARIO_ROW_START_OFFSET = 120;
const SCENARIO_SECTION_END_GAP = 120;
const SCENARIO_MEDIA_TOP = 280;
const SCENARIO_MEDIA_HEIGHT = 360;
const SCENARIO_COPY_CENTER_OFFSET = 20;
const SCENARIO_DIVIDER_TOP = 0;
const SCENARIO_DIVIDER_SHORT_SCALE = 488 / 1200;

export type ScenarioItem = {
  title: string;
  copy: string;
  video: string;
  playUrl: string;
};

type ScenarioSectionProps = {
  scenarios: ScenarioItem[];
};

type ScenarioRowProps = {
  scenario: ScenarioItem;
  index: number;
  rowHeight: number;
  trackY: MotionValue<number>;
};

function ScenarioRow({ scenario, index, rowHeight, trackY }: ScenarioRowProps) {
  const mediaCounterY = useTransform(trackY, (latestY) => -latestY - index * rowHeight - SCENARIO_ROW_START_OFFSET);
  const copyOpacity = useTransform(trackY, (latestY) => {
    const activeCenterY = SCENARIO_MEDIA_TOP + SCENARIO_MEDIA_HEIGHT / 2;
    const copyCenterY = SCENARIO_ROW_START_OFFSET + index * rowHeight + rowHeight / 2 + SCENARIO_COPY_CENTER_OFFSET + latestY;
    const distanceFromCenter = Math.abs(copyCenterY - activeCenterY);
    const fadeRange = 260;
    const activeAmount = Math.max(0, 1 - distanceFromCenter / fadeRange);

    return 0.16 + activeAmount * 0.84;
  });
  const dividerScaleX = useTransform(trackY, (latestY) => {
    const dividerY = SCENARIO_ROW_START_OFFSET + index * rowHeight + SCENARIO_DIVIDER_TOP + latestY;
    const shrinkDistance = 48;
    const shrinkProgress = Math.min(Math.max((SCENARIO_MEDIA_TOP - dividerY) / shrinkDistance, 0), 1);

    return 1 - shrinkProgress * (1 - SCENARIO_DIVIDER_SHORT_SCALE);
  });
  return (
    <article className="scenario-row">
      <div className="scenario-media-mask">
        <motion.div className="scenario-media-parallax" style={{ y: mediaCounterY }}>
          <div className={`scenario-media scenario-media-${index + 1}`}>
            <video autoPlay loop muted playsInline preload="metadata" src={scenario.video} />
            <a
              aria-label={`Play ${scenario.title}`}
              className="scenario-play-control"
              href={scenario.playUrl}
              rel="noreferrer"
              target="_blank"
            >
              <img className="scenario-play-icon" src="/play-icon.svg" alt="" />
            </a>
          </div>
        </motion.div>
      </div>
      <motion.div className="scenario-copy" style={{ opacity: copyOpacity }}>
        <h3>{scenario.title}</h3>
        <p>{scenario.copy}</p>
      </motion.div>
      {index > 0 ? (
        <motion.div className="scenario-divider" style={{ scaleX: dividerScaleX }} aria-hidden="true" />
      ) : null}
    </article>
  );
}

export function ScenarioSection({ scenarios }: ScenarioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowHeight = SCENARIO_ROW_HEIGHT;
  const totalScrollDistance = rowHeight * (scenarios.length - 1);
  const totalPinnedDistance = totalScrollDistance + SCENARIO_SECTION_END_GAP;
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

  return (
    <section
      className="scenario-band"
      ref={sectionRef}
      style={
        {
          "--scenario-count": scenarios.length,
          "--scenario-scroll-steps": scenarios.length - 1,
        } as CSSProperties & Record<"--scenario-count" | "--scenario-scroll-steps", number>
      }
    >
      <div className="scenario-sticky-stage">
        <div className="scenario-inner">
          <h2 className="heading scenario-heading">
            <span>
              Built for <strong>every scenario</strong>
            </span>
            <span>
              in <strong>every shot</strong>
            </span>
          </h2>

          <motion.div className="scenario-rows" style={{ y: trackY }}>
            {scenarios.map((scenario, index) => (
              <ScenarioRow
                index={index}
                key={scenario.title}
                rowHeight={rowHeight}
                scenario={scenario}
                trackY={trackY}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
