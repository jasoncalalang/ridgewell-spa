const fields = [
  ["Vendor", "Sunrise Office Supply"],
  ["Date", "Feb 18, 2026"],
  ["Category", "Office supplies"],
  ["Amount", "₱1,248.00"],
];

export default function ReceiptLedger() {
  return (
    <div className="scr scr-pad scr-split">
      <div className="scr-receipt" aria-hidden="true">
        <i style={{ width: "75%" }} />
        <i />
        <i style={{ width: "50%" }} />
        <i style={{ width: "66%" }} />
        <i className="is-gap" />
        <i style={{ width: "33%" }} />
      </div>
      <div>
        {fields.map(([label, value]) => (
          <div key={label} className="scr-row">
            <span className="is-muted">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <span className="scr-button">Export to Excel</span>
      </div>
    </div>
  );
}
