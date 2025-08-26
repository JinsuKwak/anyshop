import { useFetch } from "@/hooks/useFetch";
import { Announcement } from "@/types/Announcement";
import React, { useCallback, useState } from "react";

interface PromoMarqueeInnerProps {
  speedSec?: number;
  className?: string;
  iterationCount?: number;
  onFinished: () => void;
}

function PromoMarqueeInner({
  speedSec = 20,
  className,
  iterationCount,
  onFinished,
}: PromoMarqueeInnerProps) {
  const { data, error, loading } =
    useFetch<Announcement[]>("/api/announcements");

  const [visible, setVisible] = useState(true);

  const handleEnd = useCallback(() => {
    setVisible(false);
    onFinished();
  }, [onFinished]);

  if (error || loading) return null;

  const activeItems = data?.filter((i) => i.is_active).map((i) => i.body) ?? [];

  if (activeItems.length === 0) return null;

  if (!visible) return null;

  return (
    <div
      className={`marquee-bar ${className ?? ""} bg-primary`}
      role="region"
      aria-label="Promo"
    >
      <div className="marquee-track">
        <div
          className="marquee-content"
          style={{
            animationDuration: `${speedSec}s`,
            animationIterationCount: iterationCount,
          }}
          onAnimationEnd={handleEnd}
        >
          {[...activeItems, ...activeItems].map((txt, i) => (
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
          background: linear-gradient(
            90deg,
            var(--color-primary) 0%,
            transparent 100%
          );
        }
        .marquee-bar::after {
          right: 0;
          background: linear-gradient(
            270deg,
            var(--color-primary) 0%,
            transparent 100%
          );
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
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
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
export default PromoMarqueeInner;
