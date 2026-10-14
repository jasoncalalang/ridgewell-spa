import type { ReactNode } from "react";

export function BrowserFrame({
  children,
  className = "",
  flat = false,
  aspect = false,
}: {
  children: ReactNode;
  className?: string;
  flat?: boolean;
  aspect?: boolean;
}) {
  const classes = ["frame", flat && "frame-flat", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes}>
      <div className="frame-chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <i className="frame-address" />
      </div>
      <div className={aspect ? "frame-body frame-body-aspect" : "frame-body"}>
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["phone", className].filter(Boolean).join(" ")}>
      <div className="phone-screen">{children}</div>
    </div>
  );
}
