export default function ExpenseSheets() {
  return (
    <div className="scr scr-pad scr-sheets">
      <p className="scr-caption">Expense workbook</p>
      <div className="scr-sheet">
        <p className="scr-caption">VAT sheet</p>
        <div className="scr-line">
          <span>Harborline Trading</span>
          <strong>₱2,240.00</strong>
        </div>
        <p className="is-muted">12 Mar 2026 · TIN 000-000-000-000</p>
      </div>
      <div className="scr-sheet">
        <p className="scr-caption">Non-VAT sheet</p>
        <div className="scr-line">
          <span>North Pier Courier</span>
          <strong>₱860.00</strong>
        </div>
        <p className="is-muted">14 Mar 2026 · no TIN printed</p>
      </div>
    </div>
  );
}
