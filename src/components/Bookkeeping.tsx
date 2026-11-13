import { bookkeeping } from "../content";
import Arrow from "./Arrow";
import { BrowserFrame } from "./Frames";
import Screen from "./Screen";

export default function Bookkeeping({
  onInterest,
}: {
  onInterest: (interest: string) => void;
}) {
  return (
    <section
      id={bookkeeping.id}
      className="bookkeeping-section section-space"
      aria-labelledby="bookkeeping-heading"
    >
      <div className="wrap bookkeeping-layout">
        <div className="bookkeeping-copy">
          <p className="section-label">{bookkeeping.label}</p>
          <h2 id="bookkeeping-heading">{bookkeeping.heading}</h2>
          {bookkeeping.paragraphs.map((paragraph) => (
            <p key={paragraph} className="bookkeeping-text">
              {paragraph}
            </p>
          ))}
          <div className="bookkeeping-links">
            {bookkeeping.links.map((link) => (
              <a key={link.href} className="text-link" href={link.href}>
                {link.label} <Arrow />
              </a>
            ))}
            <a
              className="text-link"
              href={bookkeeping.cta.href}
              onClick={() => onInterest(bookkeeping.cta.interest)}
            >
              {bookkeeping.cta.label} <Arrow />
            </a>
          </div>
        </div>
        <div className="bookkeeping-screens">
          <figure data-reveal>
            <BrowserFrame flat className="bookkeeping-screen">
              <Screen kind="receipt-chat" alt={bookkeeping.chatAlt} />
            </BrowserFrame>
            <figcaption className="meta">{bookkeeping.captions[0]}</figcaption>
          </figure>
          <figure data-reveal>
            <BrowserFrame flat className="bookkeeping-screen">
              <Screen kind="expense-sheets" alt={bookkeeping.sheetsAlt} />
            </BrowserFrame>
            <figcaption className="meta">{bookkeeping.captions[1]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
