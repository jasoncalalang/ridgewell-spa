const rows = [
  ["Leave · R. Cruz", "Pending"],
  ["Overtime · M. Yu", "Approved"],
  ["Leave · A. Lim", "Pending"],
  ["Travel · P. Santos", "Approved"],
  ["Leave · K. Reyes", "Approved"],
  ["Overtime · J. Tan", "Pending"],
  ["Travel · L. Garcia", "Approved"],
  ["Leave · S. Diaz", "Pending"],
];

export default function Approvals() {
  return (
    <div className="scr scr-pad scr-split">
      <div>
        <p className="scr-caption">Approvals</p>
        <table className="scr-table">
          <tbody>
            {rows.map(([what, state]) => (
              <tr key={what}>
                <td>{what}</td>
                <td className={state === "Approved" ? "is-green" : "is-amber"}>
                  {state}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="scr-panel scr-stat">
        <p className="scr-caption">Gate scan</p>
        <strong>318</strong>
        <p className="scr-caption">In campus</p>
      </div>
    </div>
  );
}
