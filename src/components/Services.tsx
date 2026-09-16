import { useState } from "react";
import { services } from "../content";
import Arrow from "./Arrow";
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
              Good support starts
              <br />
              with the real work.
            </h2>
          </div>
          <p className="heading-aside">
            The numbers. The daily routines. The tools your team uses. Find a
            clearer way to keep them working together.
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
              <div
                className="service-example"
                aria-label="Illustrative service example"
              >
                <span className="example-label">An example in practice</span>
                <span className="example-topic">{service.example.label}</span>
                <div className="example-before">{service.example.before}</div>
                <div className="example-connector" aria-hidden="true">
                  ↓
                </div>
                <div className="example-after">{service.example.after}</div>
                <p>{service.example.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
