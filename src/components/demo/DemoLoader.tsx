"use client";

import dynamic from "next/dynamic";

/* The demo (and ops-core.js) load only on /demo, after the page itself, and only in the browser. */
const MapleDemo = dynamic(() => import("./MapleDemo"), {
  ssr: false,
  loading: () => (
    <div className="card-tile bg-white ring-1 ring-line p-6 md:p-8 min-h-[520px]" aria-busy="true">
      <p className="headline text-[32px] md:text-[36px]">Maple Home Services (fictional)</p>
      <p className="text-[15px] text-ink-2 mt-2">Loading the demo…</p>
    </div>
  ),
});

export default function DemoLoader() {
  return <MapleDemo />;
}
