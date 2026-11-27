const steps = [
  {
    title: "Discovery call",
    text: "A short call about how enquiries, estimates and bookings work in your business today.",
  },
  {
    title: "Written scope",
    text: "What we'll set up, what it costs and what's included, in writing, before any work starts.",
  },
  {
    title: "Setup and testing",
    text: "We set it up in your accounts and test it with you, on a phone and a computer.",
  },
  {
    title: "Handover",
    text: "You own it: your accounts, your data, your system.",
  },
];

/** "How it works": four steps rising left to right, the last one in red (like the launch day bar). */
export default function Steps() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:items-end text-left">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={s.title}
            className={`rounded-2xl p-5 md:p-6 flex flex-col ${
              ["md:min-h-[200px]", "md:min-h-[230px]", "md:min-h-[260px]", "md:min-h-[290px]"][i]
            } ${last ? "bg-red text-white" : "bg-white text-ink ring-1 ring-line"}`}
          >
            <span className={`headline tabular text-[32px] leading-none ${last ? "text-white" : "text-ink"}`} aria-hidden>
              {i + 1}
            </span>
            <h3 className="mt-4 md:mt-auto md:pt-6 text-[17px] font-semibold tracking-[-0.015em]">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            <p className={`mt-1.5 text-[15px] leading-[1.45] ${last ? "text-white/90" : "text-ink-2"}`}>{s.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
