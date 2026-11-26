export type ServiceId = "fix" | "rebuild" | "new-site" | "premium" | "not-sure";

export type Service = { id: ServiceId; label: string; detail: string };

export const services: Service[] = [
  { id: "fix", label: "Fix one problem on my website", detail: "Website Fix · $149 one-time" },
  { id: "rebuild", label: "Rebuild my current website", detail: "Website Plan · $0 upfront, $99/mo" },
  { id: "new-site", label: "A first website (I don't have one yet)", detail: "Website Plan · $0 upfront, $99/mo" },
  { id: "premium", label: "Online store or larger site", detail: "Premium · $2,500 + $129/mo" },
  { id: "not-sure", label: "Not sure yet", detail: "We'll recommend the right option" },
];

export function getService(id: string | undefined | null): Service | undefined {
  return services.find((s) => s.id === id);
}

export function contactHref(id: ServiceId): string {
  return `/contact?service=${id}`;
}
