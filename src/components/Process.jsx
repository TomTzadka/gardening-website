import './Process.css'

export default function Process({ data }) {
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
        <div className="process-steps">
          {data.steps.map((step, i) => (
            <div className="process-step" key={i}>
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
