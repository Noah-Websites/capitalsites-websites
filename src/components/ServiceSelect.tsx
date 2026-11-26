"use client";

import { useState } from "react";
import { services } from "@/lib/services";

/* Native select laid over a visible label, so long option text wraps on
   narrow screens instead of being cut off. The select keeps name="package". */
export default function ServiceSelect({ initial }: { initial?: string }) {
  const [value, setValue] = useState(initial ?? "");
  const current = services.find((s) => s.id === value);

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`field field-select flex items-center py-3 leading-[1.35] ${current ? "text-ink" : "text-ink-2"}`}
      >
        {current ? current.label : "Choose one"}
      </div>
      <select
        id="package"
        name="package"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="service-select absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      >
        <option value="" disabled>
          Choose one
        </option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
