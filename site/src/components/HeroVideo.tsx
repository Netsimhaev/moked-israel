"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/homepage-hero-model-t-demo.mp4";
const POSTER_SRC = "/images/homepage-hero-model-t-demo-poster.jpg";

// Full-bleed decorative background video behind the hero text — aria-hidden
// because the meaningful content is the overlaid heading/CTAs, not this clip.
// Playback is triggered from JS (not the `autoplay` attribute) so
// prefers-reduced-motion users never see it start moving at all — they get
// the poster frame only.
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={VIDEO_SRC}
      poster={POSTER_SRC}
      muted
      loop
      playsInline
      aria-hidden="true"
    />
  );
}
