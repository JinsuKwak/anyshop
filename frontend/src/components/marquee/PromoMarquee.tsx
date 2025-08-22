import React from "react";

type MarqueeProps = {
  items: string[];
  speedSec?: number;
  className?: string;
};

export default function PromoMarquee({
  items,
  speedSec = 20,
  className,
}: MarqueeProps) {
  return (
    <div
      className={`marquee-bar ${className ?? ""}`}
      role="region"
      aria-label="Promo"
    >
      <div className="marquee-track">
        <div
          className="marquee-content"
          style={{ animationDuration: `${speedSec}s` }}
        >
          {/* 끊김 방지를 위해 2회 이상 반복 */}
          {[...items, ...items].map((txt, i) => (
            <span key={i} style={{ paddingRight: 48 }}>
              {txt}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee-bar {
          position: relative;
          width: 100%;
          height: 30px;
          background: #111;
          color: #fff;
          overflow: hidden;
          border-bottom: 1px solid #222;
        }
        .marquee-bar::before,
        .marquee-bar::after {
          content: "";
          position: absolute;
          top: 0;
          width: 60px;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
        .marquee-bar::before {
          left: 0;
          background: linear-gradient(90deg, #111 0%, transparent 100%);
        }
        .marquee-bar::after {
          right: 0;
          background: linear-gradient(270deg, #111 0%, transparent 100%);
        }
        .marquee-track {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
        }
        .marquee-content {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
          animation: marquee linear infinite;
          padding-left: 100%;
        }
        .marquee-bar:hover .marquee-content {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
