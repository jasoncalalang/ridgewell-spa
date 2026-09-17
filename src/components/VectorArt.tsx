import { useId } from "react";

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
  return (
    <svg
      className="operations-illustration"
      viewBox="0 0 720 540"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>
        An open accounting ledger, organized records, and a workflow on a
        monitor connected by a red route.
      </title>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
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
  return (
    <svg
      className="foundation-illustration"
      viewBox="0 0 540 355"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>
        Accounting records connected to a clear, documented process.
      </title>
      <path
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
  return (
    <svg
      className="inquiry-illustration"
      viewBox="0 0 360 275"
      role="img"
      aria-labelledby={title}
    >
      <title id={title}>An envelope in an inquiry tray.</title>
      <path
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
