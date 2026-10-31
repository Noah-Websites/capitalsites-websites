/**
 * Unsplash photo IDs for the three concept demo sites.
 * All URLs resolve to images.unsplash.com (configured in next.config.ts).
 *
 * To use: `${u(id, 1200, 800)}` renders a sized Unsplash URL.
 */

export function u(photoId: string, w = 1200, h?: number): string {
  const base = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=${w}`;
  return h ? `${base}&h=${h}` : base;
}

/* ---- Fade & Co (barbershop) ---- */
export const fadeAndCo = {
  hero: "1503951914875-452162b0f3f1",
  about: "1599351431202-1e0f0137899a",
  gallery: [
    "1521590832167-7bcbfaa6381f",
    "1517832606299-7ae9b720a186",
    "1585747860715-2ba37e788b70",
    "1584316712066-fb5c2b7b4ec2",
    "1622286342621-4bd786c2447c",
    "1596728325488-58c87691e9af",
  ],
};

/* ---- Ember Kitchen (restaurant) ---- */
export const emberKitchen = {
  hero: "1414235077428-338989a2e8c0",
  about: "1552566626-52f8b828add9",
  gallery: [
    "1600891964599-f61ba0e24092",
    "1559847844-5315695dadae",
    "1546069901-ba9599a7e63c",
    "1554118811-1e0d58224f24",
    "1555396273-367ea4eb4db5",
    "1559339352-11d035aa65de",
  ],
  team: [
    "1577219491135-ce391730fb2c",
    "1580489944761-15a19d654956",
    "1559149397-6c88e1fb3875",
    "1573496359142-b8d87734a5a2",
  ],
};

/* ---- Maison Noir (fashion boutique) ---- */
export const maisonNoir = {
  hero: "1490481651871-ab68de25d43d",
  products: [
    "1521572163474-6864f9cf17ab",
    "1594633312681-425c7b97ccd1",
    "1591047139829-d91aecb6caea",
    "1434389677669-e08b4cac3105",
    "1542272604-787c3835535d",
    "1602810318383-e386cc2a3ccf",
    "1544022613-e87ca75a784a",
    "1457545195570-67f207084966",
  ],
  collections: [
    "1483985988355-763728e1935b",
    "1479064555552-3ef4979f8908",
    "1495385794356-15371f348c31",
  ],
  lookbook: [
    "1529139574466-a303027c1d8b",
    "1515886657613-9f3515b0c78f",
    "1537832816519-689ad163238b",
    "1485968579580-b6d095142e6e",
    "1538329972958-465d6d2144ed",
  ],
};
