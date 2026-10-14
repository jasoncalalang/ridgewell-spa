import { questions } from "../content";

export default function Questions() {
  return (
    <section id="questions" className="questions-section section-space">
      <div className="wrap questions-layout">
        <p className="section-label">Questions</p>
        <h2>Good to know.</h2>
        <div className="questions-list">
          {questions.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <span className="disclosure-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
