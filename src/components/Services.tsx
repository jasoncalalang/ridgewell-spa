import { services } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

export default function Services({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section id="services" className="services-section section-space">
      <div className="wrap">
        <p className="section-label">What we do</p>
        <h2>Two things, done properly.</h2>
        <div className="service-grid">
          {services.map((service) => (
            <article
              key={service.id}
              id={`service-${service.id}`}
              className="card service-card"
              data-reveal
            >
              <p className="section-label">{service.label}</p>
              <h3>{service.heading}</h3>
              <p>{service.description}</p>
              <ul className="red-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href="#contact"
                onClick={() => onInterest(service.interest)}
              >
                Talk about this service <Arrow />
              </a>
              <BrowserFrame flat className="service-screen">
                <Screen kind={service.screen} alt={service.screenAlt} />
              </BrowserFrame>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
