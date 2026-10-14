import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InquiryForm from "./components/InquiryForm";
import Services from "./components/Services";

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
        <Hero />
        <Services onInterest={setInterest} />
        <section id="contact" className="contact-section section-space">
          <div className="wrap">
            <InquiryForm interest={interest} onInterest={setInterest} />
          </div>
        </section>
      </main>
    </>
  );
}
