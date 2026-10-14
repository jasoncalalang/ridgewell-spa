const rows = [
  ["Reyes, A.", "Present"],
  ["Santos, M.", "Present"],
  ["Tan, L.", "Absent"],
  ["Cruz, J.", "Present"],
  ["Garcia, P.", "Present"],
  ["Lim, R.", "Late"],
  ["Diaz, K.", "Present"],
  ["Yu, S.", "Present"],
];

export default function AttendanceRegister() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Attendance · Grade 7, Section A</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([name, state]) => (
            <tr key={name}>
              <td>{name}</td>
              <td
                className={
                  state === "Present"
                    ? "is-green"
                    : state === "Absent"
                      ? "is-red"
                      : "is-amber"
                }
              >
                {state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="scr-button">Print school form</span>
    </div>
  );
}
