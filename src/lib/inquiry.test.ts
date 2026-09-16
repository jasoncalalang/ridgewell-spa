import test from "node:test";
import assert from "node:assert/strict";
import { validateInquiry, createEmailDraft } from "./inquiry.ts";

const valid = {
  name: "Test Visitor",
  email: "visitor@example.com",
  organization: "Example & Co",
  interest: "Accounting support",
  message: "We need a clearer accounting routine.",
};

test("empty or whitespace-only required values produce field-specific errors", () => {
  const errors = validateInquiry({
    ...valid,
    name: "   ",
    email: "",
    message: "  ",
  });
  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.message);
});
test("email and service selection must be valid", () => {
  assert.ok(validateInquiry({ ...valid, email: "invalid" }).email);
  assert.ok(
    validateInquiry({ ...valid, interest: "Invented service" }).interest,
  );
});
test("a short useful question and optional organization are accepted", () => {
  assert.deepEqual(
    validateInquiry({ ...valid, organization: "", message: "Can you help?" }),
    {},
  );
});
test("overlong values cannot create an impractical email URI", () => {
  assert.ok(validateInquiry({ ...valid, message: "x".repeat(1201) }).message);
  assert.ok(validateInquiry({ ...valid, name: "x".repeat(101) }).name);
});
test("draft is addressed to the published company email with safely encoded content", () => {
  const data = {
    ...valid,
    message: "Records & reports?\nPlease include José.",
  };
  const draft = createEmailDraft(data);
  assert.equal(draft.recipient, "ridgewell-management-services-inc@polsia.app");
  const url = new URL(draft.href);
  assert.equal(url.protocol, "mailto:");
  assert.equal(
    url.searchParams.get("subject"),
    "Ridgewell inquiry: Accounting support",
  );
  assert.match(
    url.searchParams.get("body")!,
    /Records & reports\?\nPlease include José\./,
  );
  assert.match(draft.text, /Example & Co/);
  assert.match(draft.text, /visitor@example.com/);
});
