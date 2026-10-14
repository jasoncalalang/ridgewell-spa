const rows = [
  ["00142", "A. Reyes", "₱45,000", "Mar 04", "Deposited"],
  ["00143", "M. Santos", "₱38,000", "Mar 11", "Due"],
  ["00144", "J. Dela Cruz", "₱52,000", "Mar 18", "Replaced"],
  ["00145", "L. Tan", "₱41,000", "Mar 26", "Due"],
  ["00146", "P. Garcia", "₱36,500", "Apr 02", "Due"],
  ["00147", "R. Lim", "₱47,000", "Apr 09", "Deposited"],
  ["00148", "K. Diaz", "₱39,000", "Apr 16", "Due"],
];
const tone: Record<string, string> = {
  Deposited: "is-green",
  Due: "is-amber",
  Replaced: "is-red",
};

export default function ChequesWorklist() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Cheques worklist</p>
      <table className="scr-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Tenant</th>
            <th>Amount</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([no, tenant, amount, due, state]) => (
            <tr key={no}>
              <td>{no}</td>
              <td>{tenant}</td>
              <td>{amount}</td>
              <td>{due}</td>
              <td className={tone[state]}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
