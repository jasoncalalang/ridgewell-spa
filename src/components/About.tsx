import { about } from "../content";

export default function About() {
  return (
    <section id="about" className="about-section section-space">
      <div className="wrap about-layout">
        <div className="about-copy">
          <p className="section-label">{about.label}</p>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)}>{text}</p>
          ))}
        </div>
        <dl className="about-facts">
          {about.facts.map((fact) => (
            <div key={fact.label} data-reveal>
              <dt>{fact.label}</dt>
              <dd className="fact-value">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
