import { companyEmail, serviceOptions } from "../content.ts";

export interface Inquiry {
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
}
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!inquiry.name.trim()) errors.name = "Please enter your name.";
  else if (inquiry.name.trim().length > 100)
    errors.name = "Keep your name to 100 characters or fewer.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email.trim()) ||
    inquiry.email.length > 254
  )
    errors.email = "Enter a valid email address, such as you@company.com.";
  if (inquiry.organization.length > 150)
    errors.organization =
      "Keep the organization name to 150 characters or fewer.";
  if (!serviceOptions.some((option) => option === inquiry.interest))
    errors.interest = "Choose the area closest to your need.";
  if (!inquiry.message.trim())
    errors.message = "Tell us a little about what needs attention.";
  else if (inquiry.message.trim().length > 1200)
    errors.message = "Keep your message to 1,200 characters or fewer.";
  return errors;
}

export function createEmailDraft(inquiry: Inquiry) {
  const subject = `Ridgewell inquiry: ${inquiry.interest}`;
  const body = [
    "Hello Ridgewell,",
    "",
    inquiry.message.trim(),
    "",
    `Area of support: ${inquiry.interest}`,
    `Name: ${inquiry.name.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    ...(inquiry.organization.trim()
      ? [`Organization: ${inquiry.organization.trim()}`]
      : []),
  ].join("\n");
  return {
    recipient: companyEmail,
    subject,
    body,
    href: `mailto:${companyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `To: ${companyEmail}\nSubject: ${subject}\n\n${body}`,
  };
}
