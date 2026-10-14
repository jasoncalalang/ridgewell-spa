import { companyEmail, contact } from "../content";
import Arrow from "./Arrow";
import InquiryForm from "./InquiryForm";

export default function Contact({
  interest,
  onInterest,
}: {
  interest: string;
  onInterest: (value: string) => void;
}) {
  return (
    <section id="contact" className="contact-section section-space">
      <div className="wrap">
        <div className="card contact-panel">
          <div className="contact-details">
            <p className="section-label">{contact.label}</p>
            <h2>{contact.heading}</h2>
            <div>
              <p className="contact-term">Email</p>
              <a
                className="text-link contact-email"
                href={`mailto:${companyEmail}`}
              >
                Email Ridgewell directly <Arrow diagonal />
              </a>
              <p className="meta">{companyEmail}</p>
            </div>
            <div>
              <p className="contact-term">What to include</p>
              <ul className="red-list">
                {contact.include.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="contact-term">Hours</p>
              <p>{contact.hours}</p>
            </div>
          </div>
          <InquiryForm interest={interest} onInterest={onInterest} />
        </div>
      </div>
    </section>
  );
}
