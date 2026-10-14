const grades = [
  ["Mathematics", "92"],
  ["English", "88"],
  ["Science", "90"],
  ["Filipino", "94"],
];

export default function ParentPortal() {
  return (
    <div className="scr scr-phone">
      <p className="scr-caption">Parent portal</p>
      <h3>Good morning, Maria</h3>
      <div className="scr-panel">
        <p className="scr-caption">Report card</p>
        {grades.map(([subject, grade]) => (
          <div key={subject} className="scr-row">
            <span>{subject}</span>
            <strong>{grade}</strong>
          </div>
        ))}
      </div>
      <div className="scr-panel scr-row">
        <span className="is-muted">Attendance</span>
        <strong>Present 42 of 44 days</strong>
      </div>
    </div>
  );
}
