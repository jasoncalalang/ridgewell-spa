/**
 * Words that must never appear on the page: technology and infrastructure
 * names (a build recipe for competitors), client identities, building names,
 * and school-form codes. Matched case-insensitively on word boundaries.
 * Add to this list; never remove from it.
 */
export const forbiddenWords: readonly string[] = [
  // technology
  "React",
  "Vite",
  "TypeScript",
  "JavaScript",
  "Tailwind",
  "Quarkus",
  "Java",
  "Kotlin",
  "Spring",
  "Express",
  "Postgres",
  "PostgreSQL",
  "Supabase",
  "MinIO",
  "Keycloak",
  "OIDC",
  "Kubernetes",
  "k8s",
  "minikube",
  "Docker",
  "Cloudflare",
  "n8n",
  "Flyway",
  "GitHub",
  "Playwright",
  "Redis",
  "nginx",
  "GKE",
  "Terraform",
  "Helm",
  "Cilium",
  "Jenkins",
  "Node.js",
  "Capacitor",
  "Gradle",
  // clients, places, buildings
  "CSPB",
  "Colegio",
  "Pascual",
  "Baylon",
  "MyCSPB",
  "Condocenter",
  "Rada",
  "Regency",
  "Legaspi",
  "Makati",
  "Limchoc",
  "APEX",
  "LLI",
  // form and module codes
  "SF1",
  "SF2",
  "SF9",
  "SF10",
  "DepEd",
];

const pattern = new RegExp(
  `\\b(${forbiddenWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);

/** Returns the distinct forbidden words found in `text`, in order of appearance. */
export function findForbidden(text: string): string[] {
  const found: string[] = [];
  for (const match of text.matchAll(pattern)) {
    const word = match[1];
    if (!found.some((f) => f.toLowerCase() === word.toLowerCase()))
      found.push(word);
  }
  return found;
}
