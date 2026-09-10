"use client";

import { useEffect, useRef, useState } from "react";
import DepthCarousel, { DepthCarouselItem } from "@/components/DepthCarousel";

interface ActivityImage {
  src: string;
  alt: string;
}

interface CarouselSize {
  cardWidth: number;
  cardHeight: number;
  containerHeight: number;
  spread: number;
  isMobile: boolean;
}

interface ActivityDepthCarouselProps {
  images: ActivityImage[];
  className?: string;
  tiltDirection?: "left" | "right";
}

function getCarouselSize(containerWidth: number): CarouselSize {
  const isMobile = containerWidth < 640;

  if (isMobile) {
    const cardWidth = Math.max(240, Math.round(containerWidth - 56));
    const cardHeight = Math.round(cardWidth * (9 / 16));
    return {
      cardWidth,
      cardHeight,
      containerHeight: cardHeight + 40,
      spread: 0,
      isMobile: true,
    };
  }

  const spread = Math.max(18, Math.min(32, Math.round(containerWidth * 0.045)));
  const overhead = spread * 2 + 88;
  const cardWidth = Math.max(280, Math.min(560, Math.round(containerWidth - overhead)));
  const cardHeight = Math.round(cardWidth * (9 / 16));

  return {
    cardWidth,
    cardHeight,
    containerHeight: cardHeight + 56,
    spread,
    isMobile: false,
  };
}

export default function ActivityDepthCarousel({
  images,
  className = "",
  tiltDirection = "right",
}: ActivityDepthCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<CarouselSize>(() => getCarouselSize(360));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) setSize(getCarouselSize(width));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!images.length) return null;

  const items: DepthCarouselItem[] = images.map((img) => ({
    image: img.src,
    alt: img.alt,
  }));

  const isSingle = images.length === 1;

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-full overflow-hidden flex items-center justify-center ${className}`}
      style={{ height: size.containerHeight }}
    >
      <DepthCarousel
        items={items}
        cardWidth={size.cardWidth}
        cardHeight={size.cardHeight}
        radius={size.isMobile ? 10 : 12}
        depth={size.isMobile ? 0 : 140}
        spread={size.spread}
        tilt={size.isMobile ? 0 : 10}
        tiltDirection={tiltDirection}
        visibleCards={0}
        falloff={size.isMobile ? 0 : 0.4}
        blur={size.isMobile ? 0 : 2}
        autoplay={!isSingle}
        autoplayDelay={3800}
        loop={!isSingle}
        showControls={!isSingle}
        showIndicators={!isSingle}
        tint="#050508"
        compact={size.isMobile}
        className="h-full"
      />
    </div>
  );
}
