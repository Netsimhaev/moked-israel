"use client";

import { useEffect, useRef } from "react";

// Generalized sibling to HeroVideo.tsx (which stays untouched — homepage-only,
// zero props, decorative/muted/aria-hidden background loop). This component
// is for a primary, watchable product-demo clip on /lp/[slug] landing pages:
// visible controls, sound on by default, not purely decorative. Still
// respects prefers-reduced-motion when autoPlay is requested.
export function ProductVideoPlayer({
  src,
  poster,
  autoPlay = false,
}: {
  src: string;
  poster: string;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduceMotion) {
      video.play().catch(() => {});
    }
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      src={src}
      poster={poster}
      controls
      muted={autoPlay}
      loop={autoPlay}
      playsInline
      aria-label="סרטון הדגמה של המוצר"
    />
  );
}