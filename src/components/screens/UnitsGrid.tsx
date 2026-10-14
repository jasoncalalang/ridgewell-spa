const floors = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const stacks = ["A", "B", "C", "D"];
const units = floors.flatMap((floor) =>
  stacks.map((stack) => `${floor}${stack}`),
);
function status(index: number) {
  const r = index % 7;
  if (r === 0 || r === 5) return "occupied";
  if (r === 3) return "expiring";
  return "vacant";
}
const expiring = [
  ["A. Reyes · 12C", "Mar 04"],
  ["M. Santos · 9A", "Mar 11"],
  ["J. Dela Cruz · 7B", "Mar 18"],
  ["L. Tan · 3D", "Mar 26"],
];

export default function UnitsGrid() {
  return (
    <div className="scr scr-units">
      <aside className="scr-sidebar">
        <div className="scr-brand">
          <span className="scr-mark">LT</span>
          LeaseTrack
        </div>
        <nav>
          <span className="is-active">Dashboard</span>
          <span>Units</span>
          <span>Leases</span>
          <span>Cheques</span>
          <span>Tenants</span>
          <span>Documents</span>
        </nav>
      </aside>
      <div className="scr-main">
        <div className="scr-titlebar">
          <h3>Units, Condominium</h3>
          <div className="scr-legend">
            <span>
              <i className="is-occupied" />
              Occupied
            </span>
            <span>
              <i className="is-vacant" />
              Vacant
            </span>
            <span>
              <i className="is-expiring" />
              Expiring
            </span>
          </div>
        </div>
        <div className="scr-units-body">
          <div className="units-expiring">
            <p className="scr-caption">Expiring in 30 days</p>
            {expiring.map(([tenant, date]) => (
              <div key={tenant} className="scr-row">
                <span>{tenant}</span>
                <span className="is-red">{date}</span>
              </div>
            ))}
          </div>
          <div className="scr-unit-grid">
            {units.map((unit, index) => (
              <span key={unit} className={`scr-unit is-${status(index)}`}>
                {unit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
