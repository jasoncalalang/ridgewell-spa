import { approach } from "../content";

export default function Approach() {
  return (
    <section id="approach" className="approach-section section-space">
      <div className="wrap">
        <p className="section-label">{approach.label}</p>
        <h2>{approach.heading}</h2>
        <div className="approach-steps">
          {approach.steps.map((step, i) => (
            <article key={step.title} data-reveal>
              <span className="index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
