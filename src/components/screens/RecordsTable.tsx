const rows = [
  ["Reyes, Ana", "Active", "Feb 18"],
  ["Santos, Mark", "Review", "Feb 20"],
  ["Dela Cruz, J.", "Active", "Feb 22"],
  ["Tan, Liza", "Pending", "Feb 25"],
  ["Lim, Paolo", "Active", "Feb 28"],
  ["Garcia, Rina", "Review", "Mar 02"],
];
const tone: Record<string, string> = {
  Active: "is-green",
  Review: "is-amber",
  Pending: "is-muted",
};

export default function RecordsTable() {
  return (
    <div className="scr">
      <table className="scr-table scr-table-flush">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, state, date]) => (
            <tr key={name}>
              <td>{name}</td>
              <td className={tone[state]}>{state}</td>
              <td className="is-muted">{date}</td>
              <td className="is-right">
                <span className="scr-button scr-button-small">Approve</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
