const rows = [
  ["Mathematics", "90", "92", "91", "93"],
  ["English", "88", "89", "90", "88"],
  ["Science", "91", "90", "92", "94"],
  ["Filipino", "93", "94", "93", "95"],
  ["Social Studies", "89", "91", "90", "92"],
  ["Values Education", "95", "95", "96", "96"],
];

export default function GradesTable() {
  return (
    <div className="scr scr-pad">
      <p className="scr-caption">Report card · Grade 7</p>
      <table className="scr-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th className="is-center">Q1</th>
            <th className="is-center">Q2</th>
            <th className="is-center">Q3</th>
            <th className="is-center">Q4</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([subject, ...marks]) => (
            <tr key={subject}>
              <td>{subject}</td>
              {marks.map((mark, i) => (
                <td key={i} className="is-center">
                  {mark}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span className="scr-button">Download report card</span>
    </div>
  );
}
