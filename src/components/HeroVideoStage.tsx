"use client";

import { useEffect, useRef, useState } from "react";
import { VideoCursor } from "@/components/VideoCursor";

export function HeroVideoStage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.play().catch(() => undefined);
  }, []);

  const toggleMuted = () => {
    setIsMuted((currentValue) => {
      const nextValue = !currentValue;

      if (videoRef.current) {
        videoRef.current.muted = nextValue;
      }

      return nextValue;
    });
  };

  return (
    <div className="hero-stage">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        src="/hero-video.mp4"
      />
      <div className="hero-video-controls" aria-label="Video controls">
        <button className="hero-video-control" type="button" aria-label="Expand video">
          <img src="/expand.svg" alt="" aria-hidden="true" />
        </button>
        <button className="hero-video-control" type="button" aria-label={isMuted ? "Unmute video" : "Mute video"} onClick={toggleMuted}>
          <img src={isMuted ? "/unmute.svg" : "/mute.svg"} alt="" aria-hidden="true" />
        </button>
      </div>
      <VideoCursor isMuted={isMuted} onToggleMuted={toggleMuted} />
    </div>
  );
}
