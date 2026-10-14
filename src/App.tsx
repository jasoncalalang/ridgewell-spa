import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import InquiryForm from "./components/InquiryForm";
import { hero } from "./content";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState<string>("Not sure yet");
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <section id="home" className="hero">
          <div className="wrap hero-copy">
            <p className="section-label">{hero.label}</p>
            <h1>{hero.heading}</h1>
          </div>
        </section>
        <section id="contact" className="contact-section section-space">
          <div className="wrap">
            <InquiryForm interest={interest} onInterest={setInterest} />
          </div>
        </section>
      </main>
    </>
  );
}
