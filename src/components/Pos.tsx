import { pos } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

export default function Pos({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section
      id={pos.id}
      className="pos-section section-space"
      aria-labelledby="pos-heading"
    >
      <div className="wrap pos-layout">
        <div>
          <p className="section-label">{pos.label}</p>
          <h2 id="pos-heading">{pos.heading}</h2>
          <p className="section-intro">{pos.intro}</p>
          <ul className="pos-items" role="list">
            {pos.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <a
            className="text-link pos-cta"
            href={pos.cta.href}
            onClick={() => onInterest(pos.cta.interest)}
          >
            {pos.cta.label} <Arrow />
          </a>
        </div>
        <figure data-reveal>
          <BrowserFrame flat className="pos-screen">
            <Screen kind="pos-ticket" alt={pos.screenAlt} />
          </BrowserFrame>
          <figcaption className="meta">{pos.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
