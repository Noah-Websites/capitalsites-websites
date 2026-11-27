import { fixTerms } from "@/data/offers";

export default function FixTerms({ onDark = false }: { onDark?: boolean }) {
  return (
    <dl className={`grid gap-4 sm:grid-cols-2 text-[15px] leading-[1.5] ${onDark ? "text-white/90" : "text-ink-2"}`}>
      {fixTerms().map((t) => (
        <div key={t.term} className={t.term === "Not included" ? "sm:col-span-2" : ""}>
          <dt className={`font-semibold ${onDark ? "text-white" : "text-ink"}`}>{t.term}</dt>
          <dd className="mt-0.5">{t.text}</dd>
        </div>
      ))}
    </dl>
  );
}
