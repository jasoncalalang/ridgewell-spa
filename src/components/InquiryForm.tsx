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

  useEffect(() => {
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
    setDraft(createEmailDraft(inquiry));
    setCopyState("idle");
    requestAnimationFrame(() => draftHeading.current?.focus());
  }

  async function copyDraft() {
    if (!draft || copying.current) return;
    copying.current = true;
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
      requestAnimationFrame(() => {
        draftText.current?.focus();
        draftText.current?.select();
      });
    } finally {
      copying.current = false;
    }
  }

  function edit() {
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
