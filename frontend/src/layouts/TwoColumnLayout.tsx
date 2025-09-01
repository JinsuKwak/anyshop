"use client";

import { ReactNode } from "react";

export interface TwoColumnLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
        {/* Left */}
        <aside className="col-span-1 order-2 md:order-1 md:sticky md:top-20 md:self-start mb-6 md:mb-0">
          {left}
        </aside>

        {/* Right */}
        <div className="col-span-1 order-1 md:order-2 md:col-span-4 lg:col-span-5 space-y-8 mb-14 md:mb-0">
          {right}
        </div>
      </div>
    </div>
  );
}
