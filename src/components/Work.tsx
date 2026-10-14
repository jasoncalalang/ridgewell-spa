import { caseStudies, clientWork, productWork } from "../content";
import type { CaseStudy } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

function Copy({ study }: { study: CaseStudy }) {
  return (
    <div className="work-copy">
      <span className="index" aria-hidden="true">
        {study.index}
      </span>
      <h3>{study.title}</h3>
      <p className="work-summary">{study.summary}</p>
      <p className="changed">
        <strong>What changed:</strong> {study.changed}
      </p>
      <p className="meta">
        For {study.audience} · {study.status}
      </p>
    </div>
  );
}

function FeaturedCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card work-featured" data-reveal>
      <BrowserFrame flat className="work-screen">
        <Screen kind={study.screen} alt={study.screenAlt} image={study.image} />
      </BrowserFrame>
      <Copy study={study} />
    </article>
  );
}

function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card work-card" data-reveal>
      <BrowserFrame flat aspect className="work-screen">
        <Screen kind={study.screen} alt={study.screenAlt} image={study.image} />
      </BrowserFrame>
      <Copy study={study} />
    </article>
  );
}

function ProductCard({ study }: { study: CaseStudy }) {
  return (
    <article id={`work-${study.id}`} className="card product-card" data-reveal>
      <span className="index" aria-hidden="true">
        {study.index}
      </span>
      <h3>{study.title}</h3>
      {study.tagline && <p className="tagline">{study.tagline}</p>}
      <p className="work-summary">{study.summary}</p>
      <ul className="red-list">
        <li>For: {study.audience}</li>
        <li>What changed: {study.changed}</li>
      </ul>
      <p className="meta">{study.status}</p>
      {study.link && (
        <a className="text-link" href={study.link.href}>
          {study.link.label} <Arrow />
        </a>
      )}
      <BrowserFrame flat className="product-screen">
        <Screen kind={study.screen} alt={study.screenAlt} image={study.image} />
      </BrowserFrame>
    </article>
  );
}

export default function Work() {
  const client = caseStudies.filter((study) => study.group === "client");
  const products = caseStudies.filter((study) => study.group === "product");
  const [featured, ...rest] = client;
  return (
    <>
      <section id="work" className="work-section section-space">
        <div className="wrap">
          <p className="section-label">{clientWork.label}</p>
          <h2>{clientWork.heading}</h2>
          <p className="section-intro">{clientWork.intro}</p>
          <FeaturedCard study={featured} />
          <div className="work-grid">
            {rest.map((study) => (
              <WorkCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
      <section id="products" className="products-section section-space">
        <div className="wrap">
          <p className="section-label">{productWork.label}</p>
          <h2>{productWork.heading}</h2>
          <div className="product-grid">
            {products.map((study) => (
              <ProductCard key={study.id} study={study} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
