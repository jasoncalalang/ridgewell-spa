# Components (full source)

Framework: React 19 + Vite 8, TypeScript, vanilla CSS (no Tailwind, no component library). Fonts via Fontsource (Barlow Condensed 600, Manrope Variable). Motion: GSAP + @gsap/react.

### `src/components/Arrow.tsx`

```tsx
export default function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

```

### `src/components/Services.tsx`

```tsx
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

```

### `src/components/InquiryForm.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { companyEmail, serviceOptions } from "../content";
import { createEmailDraft, validateInquiry } from "../lib/inquiry";
import type { Inquiry, InquiryErrors } from "../lib/inquiry";
import Arrow from "./Arrow";

export default function InquiryForm({
  interest,
  onInterest,
}: {
  interest: string;
  onInterest: (value: string) => void;
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [draft, setDraft] = useState<ReturnType<
    typeof createEmailDraft
  > | null>(null);
  const [copyState, setCopyState] = useState<
    "idle" | "copying" | "copied" | "failed"
  >("idle");
  const form = useRef<HTMLFormElement>(null);
  const draftHeading = useRef<HTMLHeadingElement>(null);
  const draftText = useRef<HTMLTextAreaElement>(null);
  const copying = useRef(false);
  const copyVersion = useRef(0);

  useEffect(() => {
    copyVersion.current += 1;
    copying.current = false;
    setDraft(null);
    setCopyState("idle");
  }, [interest]);

  function update(field: keyof typeof values, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inquiry: Inquiry = { ...values, interest };
    const nextErrors = validateInquiry(inquiry);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = Object.keys(nextErrors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
      return;
    }
    copyVersion.current += 1;
    copying.current = false;
    setDraft(createEmailDraft(inquiry));
    setCopyState("idle");
    requestAnimationFrame(() => draftHeading.current?.focus());
  }

  async function copyDraft() {
    if (!draft || copying.current) return;
    copying.current = true;
    const version = copyVersion.current;
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(draft.text);
      if (version !== copyVersion.current) return;
      setCopyState("copied");
    } catch {
      if (version !== copyVersion.current) return;
      setCopyState("failed");
      requestAnimationFrame(() => {
        if (version !== copyVersion.current) return;
        draftText.current?.focus();
        draftText.current?.select();
      });
    } finally {
      if (version === copyVersion.current) copying.current = false;
    }
  }

  function edit() {
    copyVersion.current += 1;
    copying.current = false;
    setDraft(null);
    setCopyState("idle");
    requestAnimationFrame(() =>
      form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus(),
    );
  }

  return (
    <div className="inquiry-card">
      {draft ? (
        <div className="draft-ready">
          <p className="section-label">Ready for your email app</p>
          <h3 ref={draftHeading} tabIndex={-1}>
            Your conversation starts here.
          </h3>
          <p>
            Your draft is ready. Open it in your email app, review it, and send
            it when you’re ready. Nothing has been sent yet.
          </p>
          <dl className="draft-details">
            <div>
              <dt>To</dt>
              <dd>{draft.recipient}</dd>
            </div>
            <div>
              <dt>About</dt>
              <dd>{interest}</dd>
            </div>
          </dl>
          <label className="draft-label" htmlFor="email-draft">
            Your email draft
          </label>
          <textarea
            ref={draftText}
            id="email-draft"
            className="draft-preview"
            value={draft.text}
            readOnly
            rows={9}
          />
          <div className="draft-actions">
            <a className="button" href={draft.href}>
              Open email app <Arrow diagonal />
            </a>
            <button
              className="button button-outline copy-button"
              disabled={copyState === "copying"}
              aria-busy={copyState === "copying"}
              onClick={copyDraft}
            >
              {copyState === "copying"
                ? "Copying…"
                : copyState === "copied"
                  ? "Draft copied"
                  : "Copy email draft"}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyState === "copied"
              ? "Copied. Paste the draft into a new email and send it to Ridgewell."
              : copyState === "failed"
                ? "Automatic copying is unavailable. The draft is selected above; copy it and paste it into your email app."
                : "No email app? Copy the draft and use your preferred email service."}
          </p>
          <button className="text-link edit-inquiry" onClick={edit}>
            Edit your inquiry
          </button>
        </div>
      ) : (
        <form ref={form} noValidate onSubmit={submit}>
          <div className="form-heading">
            <h3>A little context helps.</h3>
            <span>All fields required unless marked.</span>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="inquiry-name">Your name</label>
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "error-name" : undefined}
                required
              />
              {errors.name && (
                <span className="field-error" id="error-name">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="inquiry-email">Email address</label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "error-email" : undefined}
                required
              />
              {errors.email && (
                <span className="field-error" id="error-email">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
          <div className="field">
            <label htmlFor="inquiry-organization">
              Business or organization <span>(optional)</span>
            </label>
            <input
              id="inquiry-organization"
              name="organization"
              autoComplete="organization"
              maxLength={150}
              value={values.organization}
              onChange={(event) => update("organization", event.target.value)}
              aria-invalid={!!errors.organization}
              aria-describedby={
                errors.organization ? "error-organization" : undefined
              }
            />
            {errors.organization && (
              <span className="field-error" id="error-organization">
                {errors.organization}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="inquiry-interest">Where could we help?</label>
            <select
              id="inquiry-interest"
              name="interest"
              value={interest}
              onChange={(event) => {
                onInterest(event.target.value);
                setErrors((previous) => ({ ...previous, interest: undefined }));
              }}
              aria-invalid={!!errors.interest}
              aria-describedby={errors.interest ? "error-interest" : undefined}
              required
            >
              {serviceOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {errors.interest && (
              <span className="field-error" id="error-interest">
                {errors.interest}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="inquiry-message">
              What would you like to work better?
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              maxLength={1200}
              value={values.message}
              onChange={(event) => {
                update("message", event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${event.target.scrollHeight}px`;
              }}
              placeholder="A recurring task, an unclear process, a tool you wish you had…"
              aria-invalid={!!errors.message}
              aria-describedby={`message-hint${errors.message ? " error-message" : ""}`}
              required
            />
            <span className="field-hint" id="message-hint">
              A short description is enough. Up to 1,200 characters.
            </span>
            {errors.message && (
              <span className="field-error" id="error-message">
                {errors.message}
              </span>
            )}
          </div>
          <button className="button form-submit" type="submit">
            Prepare your inquiry <Arrow diagonal />
          </button>
          <p className="form-note">
            We’ll prepare an email for you to review and send. Your details stay
            in this page until you open your email app or copy the draft.
          </p>
          <span className="sr-only">Email recipient: {companyEmail}</span>
        </form>
      )}
    </div>
  );
}

```

### `src/components/VectorArt.tsx`

```tsx
import { useId } from "react";
import { useVectorMotion } from "../hooks/useMotion";

const ink = "#26313a";
const red = "#b51226";
const gray = "#dfe5e9";
const white = "#ffffff";

function Ledger() {
  const outline = "M0 0Q42-12 86 0Q132-12 172 0V108Q128 96 86 108Q42 96 0 108Z";
  return (
    <g fill="none" stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
      <g transform="matrix(.92 .52 -.92 .52 110 20)">
        <path d={outline} transform="translate(0 17)" fill={red} stroke={red} />
        <path d={outline} transform="translate(0 10)" fill={white} />
        <path d={outline} transform="translate(0 5)" fill={gray} />
        <path d={outline} fill={white} />
        <path d="M86 0V108" stroke={red} strokeWidth="3" />
        <path d="M12 17Q40 11 72 17M12 29Q40 23 72 29M12 41Q40 35 72 41M12 53Q40 47 72 53M12 65Q40 59 72 65M12 77Q40 71 72 77M12 89Q40 83 72 89" />
        <path d="M103 16H158V87H103Z M103 34H158M103 51H158M103 69H158M130 16V87" />
        <path
          d="M110 24h12M110 43h12M139 60h11M138 78h13"
          stroke={red}
          strokeWidth="3"
        />
        <path d="M37 9V94" stroke={gray} />
      </g>
      <path d="M193 122l25 15v22l-13-16-12 2Z" fill={red} stroke={red} />
    </g>
  );
}

function Files() {
  return (
    <g fill="none" stroke={ink} strokeWidth="1.7" strokeLinejoin="round">
      <path d="M17 91 111 37l102 58-94 55Z" fill={gray} stroke="none" />
      <path d="M19 65 106 15l108 62v24l-89 51L19 91Z" fill={white} />
      <path d="m19 65 106 61 108-49M125 126v26" />
      <path d="m30 63 76-44 96 55-76 44Z" fill={white} />
      <path d="m38 48 76-44 96 55-76 44Z" fill={white} />
      <path d="m48 32 76-44 96 55-76 44Z" fill={white} />
      <path d="m54 16 76-44 96 55-76 44Z" fill={white} />
      <path d="m65 15 37-21 10 6-37 21Z" fill={red} stroke={red} />
      <path d="m90 31 54-31m-43 38 54-31m-42 38 33-19" />
      <path d="m150 18 18-10 26 15-18 10Z" fill={gray} stroke="none" />
      <path d="m62 93 26 15v9l-26-15Z" fill={red} stroke={red} />
      <path d="m150 120 29-16v11l-29 16Z" fill={white} />
    </g>
  );
}

function Monitor() {
  return (
    <g fill="none" stroke={ink} strokeWidth="1.7" strokeLinejoin="round">
      <path d="m30 195 52-30 53 30-51 30Z" fill={gray} stroke="none" />
      <path d="m70 113 18 10v53l31 18-39 23-38-22 28-16Z" fill={white} />
      <path d="m70 113 18 10v53l31 18-39 23v-14l-25-15 15-9Z" fill={gray} />
      <path d="M0 10 136-68l10 6v155L10 172 0 166Z" fill={gray} />
      <path d="M0 10 136-68V88L0 166Z" fill={white} />
      <path d="M11 17 124-48V64L11 129Z" fill={white} />
      <path d="m61 113 12-7" stroke={red} strokeWidth="3" />
      <g transform="matrix(.86 -.5 0 .9 22 24)">
        <path d="M45 25v19H13v22m32-22h32v22M13 86v14h64V86" fill="none" />
        <path d="M25 0h40v24H25Z" fill={red} stroke={red} />
        <path d="M0 65h28v22H0Z M64 65h28v22H64Z" fill={white} />
        <path
          d="m8 76 4 4 9-11m51 7 4 4 9-11"
          fill="none"
          stroke={red}
          strokeWidth="2.5"
        />
        <path d="M37 12h17" stroke={white} strokeWidth="3" />
      </g>
      <path d="m20 196 20-12 31 18-20 12Z" fill={white} />
    </g>
  );
}

function Routing() {
  return (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round">
      <path
        d="M23 102h55V43h56m-56 59h77v65h46"
        fill="none"
        stroke={red}
        strokeWidth="3"
      />
      <path d="M7 71h52v61H7Z" fill={white} />
      <path d="M15 63h52v61H15Z" fill={white} />
      <path d="M25 79h31M25 89h31M25 99h21" />
      <path d="M124 16h72v54h-72Z" fill={white} />
      <path d="M124 16h72v13h-72Z" fill={red} stroke={red} />
      <path d="m146 46 8 8 19-20" fill="none" stroke={red} strokeWidth="2.5" />
      <path d="m190 139 9-9h28l9 9h28v55h-74Z" fill={white} />
      <path d="M190 149h74v45h-74Z" fill={gray} />
      <path d="M215 170h24" stroke={red} strokeWidth="3" />
      <path d="m115 38 8 5-8 5m67 114 8 5-8 5" fill="none" stroke={red} />
      <circle cx="78" cy="102" r="5" fill={white} stroke={red} />
    </g>
  );
}

function Inbox() {
  return (
    <g fill="none" stroke={ink} strokeWidth="1.7" strokeLinejoin="round">
      <path d="m20 148 104-60 121 69-104 60Z" fill={gray} stroke="none" />
      <path d="m31 98 93-53 106 61v54l-94 54-105-61Z" fill={white} />
      <path d="m31 98 105 61 94-53m-94 53v55" />
      <path d="m41 68 82-47 93 54-81 47Z" fill={white} />
      <path d="m49 46 82-47 93 54-81 47Z" fill={white} />
      <path d="m49 46 92 13 83-6m-83 6 2 41" fill="none" />
      <path d="m99 144 19 11v25l-19-11Z" fill={red} stroke={red} />
      <path d="m157 162 38-22v17l-38 22Z" fill={white} />
    </g>
  );
}

export function OperationsIllustration() {
  const title = useId();
  const motion = useVectorMotion();
  return (
    <svg
      className="operations-illustration"
      viewBox="0 0 720 540"
      role="img"
      ref={motion}
      aria-labelledby={title}
    >
      <title id={title}>
        An open accounting ledger, organized records, and a workflow on a
        monitor connected by a red route.
      </title>
      <g data-routes fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="m104 352 105 61 171-99 116 67 137-79"
          stroke={red}
          strokeWidth="3"
        />
        <path d="m262 377 59 34 145-84" stroke={red} strokeWidth="3" />
        <path d="m315 137 41-24 56 32" stroke={red} strokeWidth="3" />
        <path
          d="m141 193 113-65m270 305 91-52"
          stroke={gray}
          strokeWidth="1.5"
        />
        <path d="m383 314-35-21v-67" stroke={red} strokeWidth="3" />
      </g>
      <g transform="translate(35 218)">
        <Ledger />
      </g>
      <g transform="translate(254 65) scale(.94)">
        <Files />
      </g>
      <g transform="translate(470 211) scale(1.08)">
        <Monitor />
      </g>
      <g fill={white} stroke={red} strokeWidth="2">
        <path d="m199 413 10-6 10 6-10 6Z M371 314l9-6 10 6-10 6Z M488 381l8-5 9 5-9 5Z" />
      </g>
      <g
        fill={ink}
        fontFamily="Manrope Variable, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        <text x="57" y="437">
          Accounting
        </text>
        <text x="283" y="48">
          Operations
        </text>
        <text x="547" y="478">
          Software
        </text>
      </g>
      <g fill="none" stroke={ink} strokeWidth="1">
        <path d="M111 424v-22m236-342v-9m199 422-17-10" />
      </g>
    </svg>
  );
}

export function ServiceIllustration({ kind }: { kind: string }) {
  const title = useId();
  const motion = useVectorMotion(kind);
  const label =
    kind === "accounting"
      ? "An open accounting ledger"
      : kind === "operations"
        ? "A request routed to an owner and organized records"
        : kind === "documentation"
          ? "Documents organized in a filing tray"
          : "A connected workflow on a monitor";
  return (
    <svg
      ref={motion}
      className="service-illustration"
      viewBox="0 0 320 250"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>{label}</title>
      {kind === "accounting" ? (
        <g transform="translate(20 37)">
          <Ledger />
        </g>
      ) : kind === "operations" ? (
        <g transform="translate(24 24)">
          <Routing />
        </g>
      ) : kind === "documentation" ? (
        <g transform="translate(41 55)">
          <Files />
        </g>
      ) : (
        <g transform="translate(95 77) scale(.76)">
          <Monitor />
        </g>
      )}
    </svg>
  );
}

export function FoundationIllustration() {
  const title = useId();
  const motion = useVectorMotion();
  return (
    <svg
      ref={motion}
      className="foundation-illustration"
      viewBox="0 0 540 355"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>
        Accounting records connected to a clear, documented process.
      </title>
      <path
        data-route
        d="m93 229 136 79 207-120"
        stroke={red}
        strokeWidth="3"
        fill="none"
      />
      <g transform="translate(30 73) scale(1.28)">
        <Ledger />
      </g>
      <g transform="translate(334 31) scale(.72)">
        <Files />
      </g>
      <path
        d="m219 308 10-6 10 6-10 6Z"
        fill={white}
        stroke={red}
        strokeWidth="2"
      />
    </svg>
  );
}

export function InquiryIllustration() {
  const title = useId();
  const motion = useVectorMotion();
  return (
    <svg
      ref={motion}
      className="inquiry-illustration"
      viewBox="0 0 360 275"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>An envelope in an inquiry tray.</title>
      <path
        data-route
        d="m22 208 108 63 165-96"
        fill="none"
        stroke={red}
        strokeWidth="2"
      />
      <g transform="translate(40 28)">
        <Inbox />
      </g>
    </svg>
  );
}

```

### `src/components/inquiry.css`

```css
@layer components {
  .inquiry-card {
    background: var(--white);
    border-top: 2px solid var(--ink);
    padding-top: 1.5rem;
    min-width: 0;
  }
  .form-heading {
    margin-bottom: 1.6rem;
  }
  .form-heading h3 {
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
  }
  .form-heading > span {
    color: var(--muted);
    font-size: 0.75rem;
  }
  .form-row {
    display: grid;
    gap: 0 1.2rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 1.15rem;
    min-width: 0;
  }
  .field label,
  .draft-label {
    font-size: 0.875rem;
    font-weight: 650;
  }
  .field label span {
    font-weight: 400;
    color: var(--muted);
  }
  .field input,
  .field textarea,
  .field select,
  .draft-preview {
    width: 100%;
    min-width: 0;
    border: 1px solid var(--control-border);
    border-radius: 3px;
    min-height: 48px;
    background: var(--white);
    color: var(--ink);
    padding: 0.7rem 0.8rem;
    font-size: 1rem;
    line-height: 1.6;
    scroll-margin-block: 7rem;
  }
  .field textarea {
    resize: none;
    min-height: 125px;
  }
  .field select {
    padding-right: 1.5rem;
  }
  .field input:hover,
  .field select:hover,
  .field textarea:hover,
  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: var(--ink);
  }
  .field textarea::placeholder {
    color: var(--muted);
    font-size: 0.85rem;
    opacity: 1;
  }
  .field [aria-invalid="true"] {
    border-color: var(--red);
  }
  .field-error {
    color: var(--red);
    font-size: 0.875rem;
  }
  .field-hint {
    color: var(--muted);
    font-size: 0.8rem;
  }
  .form-submit {
    margin-top: 0.4rem;
  }
  .form-note {
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.8;
    margin-top: 1rem;
    max-width: 32rem;
  }
  .draft-ready > p:not(.section-label) {
    color: var(--muted);
    font-size: 1rem;
    margin-block: 1rem;
  }
  .draft-ready h3 {
    font-size: 1.7rem;
  }
  .draft-details {
    margin-block: 1.5rem;
    font-size: 0.875rem;
  }
  .draft-details > div {
    display: grid;
    grid-template-columns: 3rem 1fr;
    gap: 0.6rem;
    margin-block: 0.5rem;
  }
  .draft-details dt {
    color: var(--muted);
  }
  .draft-details dd {
    margin: 0;
    overflow-wrap: anywhere;
  }
  .draft-label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .draft-preview {
    resize: vertical;
    background: var(--white);
    font-size: 1rem;
    min-height: 220px;
  }
  .draft-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  .copy-button {
    min-width: 150px;
  }
  .copy-button:disabled {
    opacity: 0.7;
    cursor: progress;
  }
  .draft-ready .copy-status {
    min-height: 3.5em;
    font-size: 0.875rem;
  }
  .edit-inquiry {
    border: 0;
    background: none;
    padding: 0.3rem 0;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  @media (min-width: 600px) {
    .form-row {
      grid-template-columns: 1fr 1fr;
    }
  }
}

```
