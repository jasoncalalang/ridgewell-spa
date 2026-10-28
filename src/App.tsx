import { useEffect, useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Accounting from "./components/Accounting";
import Offer from "./components/Offer";
import Work from "./components/Work";
import Approach from "./components/Approach";
import About from "./components/About";
import Questions from "./components/Questions";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState<string>("Not sure yet");
  useEffect(() => {
    let id = location.hash.slice(1);
    if (!id) return;
    try {
      id = decodeURIComponent(id);
    } catch {
      /* malformed escape: fall back to the raw fragment */
    }
    // Jump, don't glide: the page-wide smooth scrolling is for in-page
    // links, not for landing on a deep link.
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "instant", block: "start" });
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <Hero />
        <Services onInterest={setInterest} />
        <Accounting onInterest={setInterest} />
        <Offer onInterest={setInterest} />
        <Work />
        <Approach />
        <About />
        <Questions />
        <Contact interest={interest} onInterest={setInterest} />
      </main>
      <Footer />
    </>
  );
}
