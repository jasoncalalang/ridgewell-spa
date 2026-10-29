import { offer } from "../content";
import Arrow from "./Arrow";

export default function Offer({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section
      id="offer"
      className="offer-section section-space"
      aria-labelledby="offer-heading"
    >
      <div className="wrap">
        <p className="section-label">{offer.label}</p>
        <h2 id="offer-heading">{offer.heading}</h2>
        <p className="section-intro">{offer.intro}</p>
        <ol className="offer-steps" role="list">
          {offer.steps.map((step) => (
            <li key={step.index} className="offer-step" data-reveal>
              <span className="index" aria-hidden="true">
                {step.index}
              </span>
              <div className="offer-step-content">
                <h3 id={`offer-step-${step.index}`}>{step.title}</h3>
                <p className="meta offer-tag">{step.tag}</p>
                <p className="offer-description">{step.text}</p>
                {step.tiers && (
                  <ul
                    className="offer-tiers"
                    role="list"
                    aria-labelledby={`offer-step-${step.index}`}
                  >
                    {step.tiers.map((tier) => (
                      <li
                        key={tier.title}
                        className="card offer-tier"
                        data-reveal
                      >
                        <h4>{tier.title}</h4>
                        <p className="offer-description">{tier.text}</p>
                        <ul className="red-list" role="list">
                          {tier.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
                {step.items && (
                  <ul className="red-list" role="list">
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {step.note && <p className="meta offer-note">{step.note}</p>}
                {step.cta && (
                  <a
                    className="text-link"
                    href={step.cta.href}
                    onClick={() => onInterest(step.cta!.interest)}
                  >
                    {step.cta.label} <Arrow />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
        <article className="card offer-privacy" data-reveal>
          <p className="section-label">{offer.privacy.label}</p>
          <h3>{offer.privacy.heading}</h3>
          <p className="offer-description">{offer.privacy.text}</p>
          <ul className="red-list" role="list">
            {offer.privacy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="meta offer-note">{offer.privacy.note}</p>
        </article>
        <div className="offer-actions">
          <a
            className="button"
            href={offer.cta.href}
            onClick={() => onInterest(offer.cta.interest)}
          >
            {offer.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
