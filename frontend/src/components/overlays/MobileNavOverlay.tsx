// components/overlays/MobileNavOverlay.tsx
"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

type NavLink = { href: string; label: string; prefetch?: boolean };

type MobileNavOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  className?: string;
};

export default function MobileNavOverlay({
  isOpen,
  onClose,
  links,
  className,
}: MobileNavOverlayProps) {
  // ESC Close, body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Overlay Node
  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          className={`fixed inset-0 z-[9999] bg-[var(--color-background)]/90 backdrop-blur-sm ${
            className ?? ""
          }`}
        >
          {/* close */}
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground/70 hover:text-foreground transition"
          >
            <X className="w-8 h-8" />
          </button>

          {/* contents */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="h-full w-full flex items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    prefetch={l.prefetch}
                    onClick={onClose}
                    className="text-2xl md:text-3xl font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // using potal to render at body level
  // to cover "entire screen" outside of Navbar
  if (typeof window === "undefined") return null;
  return createPortal(overlay, document.body);
}
