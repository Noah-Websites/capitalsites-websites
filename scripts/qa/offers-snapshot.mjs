// Prints what the QA suite expects, straight from src/data/offers.ts (Node 22.18+ / 23.6+).
import {
  allPriceAmounts,
  contactOptions,
  placeholderFor,
  priceLine,
} from "../../src/data/offers.ts";

const options = contactOptions.map((o) => ({
  slug: o.slug,
  label: o.label,
  name: o.offer ? o.offer.name : o.label,
  priceLine: o.offer ? priceLine(o.offer) : "",
  availability: o.offer ? o.offer.availability : "",
  placeholder: placeholderFor(o.slug),
}));
const aliases = {
  rebuild: { slug: "plan", placeholder: placeholderFor("plan", "rebuild") },
  "new-site": { slug: "plan", placeholder: placeholderFor("plan", "new-site") },
  "website-plan": { slug: "plan", placeholder: placeholderFor("plan", "website-plan") },
};
process.stdout.write(JSON.stringify({ allowed: allPriceAmounts(), options, aliases }));
