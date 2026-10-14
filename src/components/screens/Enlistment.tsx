const rows = [
  ["Data Structures", true],
  ["Web Systems", true],
  ["Ethics", true],
  ["Statistics", true],
  ["Discrete Mathematics", true],
  ["Physical Education", true],
  ["Philippine Literature", true],
  ["Technical Writing", false],
] as const;

export default function Enlistment() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Subject enlistment · 2nd year</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([subject, ok]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td className={ok ? "is-green" : "is-muted"}>
                {ok ? "Prerequisite met" : "Not yet available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
