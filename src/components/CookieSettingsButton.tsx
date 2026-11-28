"use client";

import type { ReactNode } from "react";
import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

/** Reopens the analytics choice (footer, privacy page). */
export default function CookieSettingsButton({
  className = "hover:underline hover:text-ink text-left",
  children = "Cookie settings",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      {children}
    </button>
  );
}
