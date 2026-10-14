const rows = [
  ["#1042 · M. Garcia", "Registered"],
  ["#1043 · P. Lim", "Assessed"],
  ["#1044 · R. Diaz", "Admitted"],
  ["#1045 · K. Yu", "Registered"],
  ["#1046 · A. Ocampo", "Sectioned"],
  ["#1047 · J. Torres", "Assessed"],
  ["#1048 · L. Mendoza", "Registered"],
  ["#1049 · S. Bautista", "Admitted"],
];
const tone: Record<string, string> = {
  Registered: "is-muted",
  Assessed: "is-amber",
  Admitted: "is-green",
  Sectioned: "is-green",
};

export default function EnrollmentQueue() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Enrollment queue</p>
      <table className="scr-table">
        <tbody>
          {rows.map(([who, state]) => (
            <tr key={who}>
              <td>{who}</td>
              <td className={tone[state]}>{state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
