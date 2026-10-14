import type { ReactElement } from "react";
import UnitsGrid from "./screens/UnitsGrid";
import ParentPortal from "./screens/ParentPortal";
import GradesTable from "./screens/GradesTable";
import AttendanceRegister from "./screens/AttendanceRegister";
import EnrollmentQueue from "./screens/EnrollmentQueue";
import Approvals from "./screens/Approvals";
import Enlistment from "./screens/Enlistment";
import ChequesWorklist from "./screens/ChequesWorklist";
import ReceiptLedger from "./screens/ReceiptLedger";
import WebsiteWireframe from "./screens/WebsiteWireframe";
import RecordsTable from "./screens/RecordsTable";

export type ScreenKey =
  | "units-grid"
  | "parent-portal"
  | "grades-table"
  | "attendance-register"
  | "enrollment-queue"
  | "approvals"
  | "enlistment"
  | "cheques-worklist"
  | "receipt-ledger"
  | "website-wireframe"
  | "records-table";

export interface ScreenImage {
  src: string;
  width: number;
  height: number;
}

const drawn: Record<ScreenKey, () => ReactElement> = {
  "units-grid": UnitsGrid,
  "parent-portal": ParentPortal,
  "grades-table": GradesTable,
  "attendance-register": AttendanceRegister,
  "enrollment-queue": EnrollmentQueue,
  approvals: Approvals,
  enlistment: Enlistment,
  "cheques-worklist": ChequesWorklist,
  "receipt-ledger": ReceiptLedger,
  "website-wireframe": WebsiteWireframe,
  "records-table": RecordsTable,
};

/**
 * One product screen. Drawn in HTML/CSS by default; when a real cropped
 * screenshot exists, pass `image` and the drawing is replaced by an <img>
 * with the same accessible name.
 */
export default function Screen({
  kind,
  alt,
  image,
}: {
  kind: ScreenKey;
  alt: string;
  image?: ScreenImage;
}) {
  if (image) {
    return (
      <img
        className="screen screen-image"
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    );
  }
  const Drawn = drawn[kind];
  return (
    <div className="screen" role="img" aria-label={alt}>
      <div className="screen-inner" aria-hidden="true">
        <Drawn />
      </div>
    </div>
  );
}
