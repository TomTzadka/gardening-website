import './About.css'

export default function About({ data }) {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-image-wrap">
              <div className="about-img-placeholder">
                <span>🌳</span>
              </div>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-num">🌱</span>
                  <span className="stat-label">גישה מודרנית</span>
                </div>
                <div className="stat">
                  <span className="stat-num">💧</span>
                  <span className="stat-label">הידרופוניקה</span>
                </div>
              </div>
            </div>
          </div>
          <div className="about-text">
            <h2 className="section-title">{data.title}</h2>
            <p className="about-description">{data.description}</p>
            <div className="about-values">
              {data.values.map((val, i) => (
                <div className="value-card" key={i}>
                  <span className="value-icon">{val.icon}</span>
                  <div>
                    <h4 className="value-title">{val.title}</h4>
                    <p className="value-text">{val.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
