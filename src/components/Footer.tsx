import Link from "next/link";

const cols = [
  {
    title: "Plans",
    links: [
      { href: "/pricing", label: "Website Plan" },
      { href: "/pricing", label: "Premium" },
      { href: "/pricing#faq", label: "Pricing FAQ" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Concept work" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { href: "/audit", label: "Free website audit" },
      { href: "/contact", label: "Contact" },
      { href: "mailto:capitalsitesottawa@gmail.com", label: "Email" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-snow text-ink-2 text-[12px] leading-[1.6]">
      <div className="max-w-[1024px] mx-auto px-5 pt-6 pb-10">
        <p className="pb-4 border-b border-line">
          All prices in CAD. Website Plan: no upfront payment; $99/month starts on launch day with a 12-month minimum,
          then $79/month or cancel with 30 days notice.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 border-b border-line">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-semibold text-ink mb-2">{c.title}</h3>
              <ul className="space-y-1.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:underline hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} CapitalSites. Ontario web studio · London, Toronto, Ottawa</p>
          <p>capitalsitesottawa@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
