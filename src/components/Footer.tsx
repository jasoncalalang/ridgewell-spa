import { caseStudies } from "../content";

const footerWork = ["portal", "leasetrack", "ledger"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <a className="brand footer-brand" href="#home" aria-label="Ridgewell home">
              <img
                src="./brand/ridgewell-logo.jpg"
                width="1186"
                height="280"
                alt="Ridgewell Management Services, Inc."
              />
            </a>
            <p>Website design · Bespoke system development</p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {caseStudies
              .filter((study) => footerWork.includes(study.id))
              .map((study) => (
                <a key={study.id} href={`#work-${study.id}`}>
                  {study.title}
                </a>
              ))}
            <a href="#home">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </nav>
        </div>
        <p className="footer-bottom">
          © {new Date().getFullYear()} Ridgewell Management Services, Inc.
        </p>
      </div>
    </footer>
  );
}
