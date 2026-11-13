const fields = [
  ["Supplier", "Harborline Trading"],
  ["Date", "12 Mar 2026"],
  ["Amount", "₱2,240.00"],
  ["TIN", "000-000-000-000"],
];

export default function ReceiptChat() {
  return (
    <div className="scr scr-pad scr-chat">
      <p className="scr-caption">Receipt chat</p>
      <div className="scr-panel scr-chat-in">
        <div className="scr-receipt" aria-hidden="true">
          <i style={{ width: "80%" }} />
          <i />
          <i style={{ width: "55%" }} />
          <i style={{ width: "70%" }} />
          <i className="is-gap" />
          <i style={{ width: "40%" }} />
        </div>
        <div>
          <strong>Harborline Trading</strong>
          <p className="is-muted">12 Mar 2026 · receipt photo</p>
        </div>
      </div>
      <div className="scr-panel scr-chat-out">
        <p className="scr-caption">Logged on the VAT sheet</p>
        {fields.map(([label, value]) => (
          <div key={label} className="scr-row">
            <span className="is-muted">{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
        <p className="scr-ask">
          The next photo is cut off at the total. What amount should I enter?
        </p>
      </div>
    </div>
  );
}
