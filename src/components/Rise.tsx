import type { ReactNode } from "react";

export default function Rise({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rise ${className}`}>{children}</div>;
}
