import { useEffect, useRef, useState } from "react";
const navigation = [
  ["Services", "#services"],
  ["Our approach", "#approach"],
  ["About Ridgewell", "#about"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function wide() {
      if (window.innerWidth >= 960) setOpen(false);
    }
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", wide);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", wide);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <a
          href="#home"
          className="brand"
          aria-label="Ridgewell home"
          onClick={() => setOpen(false)}
        >
          <img
            src="./brand/ridgewell-logo.jpg"
            alt="Ridgewell Management Services, Inc."
            width="1186"
            height="280"
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="button button-small header-contact" href="#contact">
          Let’s talk
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span
            className={open ? "menu-icon is-open" : "menu-icon"}
            aria-hidden="true"
          >
            <i />
            <i />
          </span>
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#questions" onClick={() => setOpen(false)}>
          Common questions
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Let’s talk
        </a>
      </nav>
    </header>
  );
}
