import { useState } from "react";
import { useSectionMotion } from "./hooks/useMotion";
import Header from "./components/Header";
import Arrow from "./components/Arrow";
import Services from "./components/Services";
import { companyEmail, questions } from "./content";
import InquiryForm from "./components/InquiryForm";
import {
  OperationsIllustration,
  FoundationIllustration,
  InquiryIllustration,
} from "./components/VectorArt";

export default function App() {
  const motion = useSectionMotion();
  const [interest, setInterest] = useState("General operations support");
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" ref={motion}>
        <section id="home" className="hero">
          <div className="wrap hero-layout">
            <div className="hero-copy">
              <p className="section-label">Support for Philippine businesses</p>
              <h1>
                Business,
                <br />
                in working
                <br />
                order.
              </h1>
              <p className="hero-description">
                Accounting, everyday operations, and software that fits. Put the
                right support behind the work your team does.
              </p>
              <a className="button" href="#contact">
                Talk through your needs <Arrow diagonal />
              </a>
            </div>
            <figure className="hero-figure">
              <OperationsIllustration />
              <figcaption>
                <span className="caption-rule" aria-hidden="true" />
                The numbers. The handoffs. The tools. Connected.
              </figcaption>
            </figure>
          </div>
          <div className="hero-foot wrap">
            <p>
              Grounded in accounting experience <strong>since 2004.</strong>
            </p>
            <a href="#services">
              Find your starting point <Arrow />
            </a>
          </div>
        </section>

        <Services onInterest={setInterest} />

        <section id="about" className="about-section section-space">
          <div className="wrap about-layout">
            <figure className="about-figure">
              <FoundationIllustration />
              <figcaption>Clear records are a good place to start.</figcaption>
            </figure>
            <div className="about-copy">
              <p className="section-label">Why Ridgewell</p>
              <h2>
                An accounting
                <br />
                point of view.
              </h2>
              <p>
                The numbers tell you where to look. Understanding the work
                behind them helps you decide what to change.
              </p>
              <p>
                Our accounting experience dates to 2004. We bring that
                perspective to your routines, responsibilities, and systems,
                with support that fits the people and resources you have.
              </p>
              <a href="#approach" className="text-link">
                How we approach the work <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section id="approach" className="approach-section section-space">
          <div className="wrap approach-layout">
            <div className="approach-intro">
              <p className="section-label">From question to next step</p>
              <h2>
                One useful
                <br />
                change at a time.
              </h2>
              <p>
                Bring the task that takes too long, the handoff that keeps
                slipping, or the system your team has outgrown.
              </p>
              <a className="text-link" href="#contact">
                Tell us what needs attention <Arrow />
              </a>
            </div>
            <div className="approach-steps">
              <article>
                <span className="step-number">01</span>
                <div>
                  <h3>Look at the work.</h3>
                  <p>
                    Understand the routine as it is today. Find the repeated
                    task, unclear responsibility, or missing information.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">02</span>
                <div>
                  <h3>Choose a practical fix.</h3>
                  <p>
                    Work out what would help: accounting support, a documented
                    process, a better handoff, or a focused tool.
                  </p>
                </div>
              </article>
              <article>
                <span className="step-number">03</span>
                <div>
                  <h3>Make it part of the day.</h3>
                  <p>
                    Put the change into practice, with documentation and
                    follow-through your team can use as the business grows.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="questions" className="questions-section section-space">
          <div className="wrap questions-layout">
            <div>
              <p className="section-label">Before we talk</p>
              <h2>
                A few things
                <br />
                to know.
              </h2>
            </div>
            <div className="questions-list">
              {questions.map((item) => (
                <details key={item.question}>
                  <summary>
                    {item.question}
                    <span className="disclosure-icon" aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-space">
          <div className="wrap contact-layout">
            <div className="contact-intro">
              <p className="section-label">Start a conversation</p>
              <h2>
                What needs
                <br />
                to work better?
              </h2>
              <p>
                A short description of your business and the work that needs
                attention is enough to begin.
              </p>
              <a className="text-link" href={`mailto:${companyEmail}`}>
                Email Ridgewell directly <Arrow diagonal />
              </a>
              <InquiryIllustration />
            </div>
            <InquiryForm interest={interest} onInterest={setInterest} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <a
              className="brand footer-brand"
              href="#home"
              aria-label="Ridgewell home"
            >
              <img
                src="./brand/ridgewell-logo.jpg"
                width="1186"
                height="280"
                alt="Ridgewell Management Services, Inc."
              />
            </a>
            <p>
              Accounting. Operations.
              <br />A business in working order.
            </p>
            <a className="text-link" href="#home">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Ridgewell Management Services, Inc.
            </span>
            <span>Supporting Philippine businesses.</span>
            <a href="#questions">Common questions</a>
          </div>
        </div>
      </footer>
    </>
  );
}
