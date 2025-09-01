import { useEffect, useState } from "react";

interface DelayedProps {
  delay: number;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const Delayed = ({ delay, fallback = null, children }: DelayedProps) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShown(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return isShown ? children : fallback;
};
