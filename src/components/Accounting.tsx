import { accounting } from "../content";
import Arrow from "./Arrow";

export default function Accounting({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section
      id={accounting.id}
      className="accounting-section section-space"
      aria-labelledby="accounting-heading"
    >
      <div className="wrap">
        <p className="section-label">{accounting.label}</p>
        <h2 id="accounting-heading">{accounting.heading}</h2>
        <p className="section-intro">{accounting.intro}</p>
        <ul className="accounting-items" role="list">
          {accounting.items.map((item) => (
            <li key={item.title} className="card accounting-item" data-reveal>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
        <a
          className="text-link accounting-cta"
          href={accounting.cta.href}
          onClick={() => onInterest(accounting.cta.interest)}
        >
          {accounting.cta.label} <Arrow />
        </a>
      </div>
    </section>
  );
}
