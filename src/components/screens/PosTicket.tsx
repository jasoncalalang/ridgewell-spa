const lines = [
  ["Bottled water", "₱50.00"],
  ["Meal", "₱120.00"],
];

const totals = [
  ["Vatable sales", "₱151.79"],
  ["VAT", "₱18.21"],
  ["Total", "₱170.00"],
  ["Cash", "₱200.00"],
  ["Change", "₱30.00"],
];

export default function PosTicket() {
  return (
    <div className="scr scr-pad scr-pos">
      <p className="scr-caption">Counter</p>
      {lines.map(([item, amount]) => (
        <div key={item} className="scr-line">
          <span>{item}</span>
          <strong>{amount}</strong>
        </div>
      ))}
      <div className="scr-pos-totals">
        {totals.map(([label, amount]) => (
          <div key={label} className="scr-line">
            <span className={label === "Total" ? undefined : "is-muted"}>{label}</span>
            <strong>{amount}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
