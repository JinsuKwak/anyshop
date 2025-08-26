import React, { useEffect, useState, useCallback } from "react";
import PromoMarqueeInner from "./PromoMarqueeInner";

interface MarqueeProps {
  speedSec?: number;
  className?: string;
  storageKey?: string;
  iterationCount?: number;
}

export default function PromoMarquee({
  speedSec = 20,
  className,
  storageKey = "promo_marquee_shown",
  iterationCount = 3,
}: MarqueeProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem(storageKey) === "1";
    if (!shown) setEnabled(true);
  }, [storageKey]);

  if (!enabled) return null;
  return (
    <PromoMarqueeInner
      speedSec={speedSec}
      className={className}
      iterationCount={iterationCount}
      onFinished={() => {
        sessionStorage.setItem(storageKey, "1");
      }}
    />
  );
}
