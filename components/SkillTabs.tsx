"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export interface SkillTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const SkillTabs: React.FC<SkillTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}) => {
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Setup GSAP animations
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { 
          scale: 1.2, 
          xPercent: -50, 
          duration: 2, 
          ease: 'power3.easeOut', 
          overwrite: 'auto' 
        }, 0);

        if (label) {
          tl.to(label, { 
            y: -(h + 8), 
            duration: 2, 
            ease: 'power3.easeOut', 
            overwrite: 'auto' 
          }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { 
            y: 0, 
            opacity: 1, 
            duration: 2, 
            ease: 'power3.easeOut', 
            overwrite: 'auto' 
          }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    const timer = setTimeout(layout, 100);
    window.addEventListener('resize', layout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', layout);
    };
  }, [tabs]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-purple-500/20 inline-flex ${className}`}
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative overflow-hidden inline-flex items-center justify-center 
              px-5 py-2.5 rounded-full text-sm font-medium 
              transition-all duration-300 gap-2.5
              group
              ${isActive 
                ? 'text-white' 
                : 'text-gray-400 hover:text-pink-400'
              }
            `}
            onMouseEnter={() => handleEnter(index)}
            onMouseLeave={() => handleLeave(index)}
          >
            {/* GSAP Animated Circle - SEMUA TAB PINK */}
            <span
              className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #EC4899, #8B5CF6)',
                willChange: 'transform',
                // SEMUA TAB memiliki background pink (tidak hanya yang aktif)
                opacity: 1,
              }}
              ref={el => {
                circleRefs.current[index] = el;
              }}
            />
            
            {/* Label - Icon dan Text sejajar */}
            <span className="label-stack relative inline-flex items-center gap-2.5 leading-[1] z-[2]">
              <span
                className="pill-label relative z-[2] inline-flex items-center gap-2.5"
                style={{ willChange: 'transform' }}
              >
                {/* Icon - SEMUA TAB PUTIH */}
                <span className={`
                  transition-colors duration-300 inline-flex items-center
                  text-white
                `}>
                  {tab.icon}
                </span>
                {/* Label Text - SEMUA TAB PUTIH */}
                <span className={`
                  transition-colors duration-300
                  text-white
                `}>
                  {tab.label}
                </span>
              </span>
              
              {/* Hover State - Tetap putih */}
              <span
                className="pill-label-hover absolute left-0 top-0 z-[3] inline-flex items-center gap-2.5 whitespace-nowrap"
                style={{
                  color: '#ffffff',
                  willChange: 'transform, opacity'
                }}
                aria-hidden="true"
              >
                <span className="text-white inline-flex items-center">{tab.icon}</span>
                <span className="text-white">{tab.label}</span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SkillTabs;