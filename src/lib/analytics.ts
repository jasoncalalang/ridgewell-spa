export const measurementId = "G-2HL3GMPLYM";

export const productionHosts = [
  "www.ridgewell.com.ph",
  "ridgewell.com.ph",
] as const;

type LeadEvent = "contact_email_click" | "contact_phone_click" | "generate_lead";

type Gtag = (...args: unknown[]) => void;

function currentGtag(): Gtag | undefined {
  return (globalThis as { window?: { gtag?: Gtag } }).window?.gtag;
}

/** True only for the public site. Localhost and preview hosts stay out. */
export function isProductionAnalyticsHost(hostname: string): boolean {
  return (productionHosts as readonly string[]).includes(hostname);
}

function paramsAreSafe(params?: Record<string, string>): boolean {
  if (!params) return true;
  return Object.entries(params).every(([key, value]) => {
    if (/email|name|phone|tel|message|organization|body|href|subject/i.test(key))
      return false;
    return !/[@]|mailto:|tel:/i.test(value);
  });
}

/** Sends a lead event when gtag is present. Drops params that could identify a person. */
export function track(event: LeadEvent, params?: Record<string, string>) {
  const gtag = currentGtag();
  if (!gtag || !paramsAreSafe(params)) return;
  gtag("event", event, params);
}

/** Records mailto and tel clicks. The href itself is never sent. */
export function bindLeadClicks(target: Document = document) {
  function onClick(event: Event) {
    const node = event.target;
    if (!(node instanceof Element)) return;
    const href = node.closest("a")?.getAttribute("href") ?? "";
    if (/^mailto:/i.test(href)) track("contact_email_click");
    else if (/^tel:/i.test(href)) track("contact_phone_click");
  }
  target.addEventListener("click", onClick);
  return () => target.removeEventListener("click", onClick);
}
