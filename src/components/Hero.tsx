import { hero, proof } from "../content";
import { BrowserFrame, PhoneFrame } from "./Frames";
import Screen from "./Screen";

export default function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <div className="wrap hero-copy">
          <p className="section-label">{hero.label}</p>
          <h1>{hero.heading}</h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="button" href={hero.primary.href}>
              {hero.primary.label}
            </a>
            <a className="button button-outline" href={hero.secondary.href}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
        <div className="hero-stage" data-reveal>
          <BrowserFrame className="hero-frame">
            <Screen kind={hero.screen} alt={hero.screenAlt} />
          </BrowserFrame>
          <PhoneFrame className="hero-phone">
            <Screen kind={hero.phone} alt={hero.phoneAlt} />
          </PhoneFrame>
        </div>
      </section>
      <section className="proof" aria-label="In daily use">
        <div className="wrap">
          <p>{proof.line}</p>
          <ul className="chips">
            {proof.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
