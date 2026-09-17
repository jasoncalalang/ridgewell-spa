import { useState } from "react";
import { services } from "../content";
import Arrow from "./Arrow";
import { ServiceIllustration } from "./VectorArt";

export default function Services({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  return (
    <section id="services" className="services-section section-space">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="section-label">Where we can help</p>
            <h2>
              Find the support
              <br />
              behind better work.
            </h2>
          </div>
          <p className="heading-aside">
            Start with the part of your business that needs attention. We’ll
            help you work out what comes next.
          </p>
        </div>
        <div className="service-layout">
          <div
            className="service-index"
            role="tablist"
            aria-label="Service areas"
            aria-orientation="vertical"
            onKeyDown={(event) => {
              if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
                return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? services.length - 1
                    : (selected +
                        (event.key === "ArrowDown" ? 1 : -1) +
                        services.length) %
                      services.length;
              setSelected(next);
              document.getElementById(`service-tab-${next}`)?.focus();
            }}
          >
            {services.map((item, index) => (
              <button
                key={item.id}
                id={`service-tab-${index}`}
                role="tab"
                aria-selected={selected === index}
                aria-controls="service-panel"
                tabIndex={selected === index ? 0 : -1}
                onClick={() => setSelected(index)}
              >
                <span>
                  <strong>{item.title}</strong>
                  <span>{item.short}</span>
                </span>
                <Arrow />
              </button>
            ))}
          </div>
          <div
            id="service-panel"
            className="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${selected}`}
            tabIndex={0}
          >
            <div key={service.id} className="service-panel-content">
              <figure className="service-drawing">
                <ServiceIllustration kind={service.id} />
                <figcaption>
                  <span>For example</span>
                  {service.example.before}
                  <span className="example-outcome">
                    <Arrow />
                    {service.example.after}
                  </span>
                </figcaption>
              </figure>
              <div className="service-copy">
                <h3>{service.heading}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="service-fit">{service.fit}</p>
                <a
                  className="text-link"
                  href="#contact"
                  onClick={() => onInterest(service.interest)}
                >
                  Talk about this service <Arrow />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
