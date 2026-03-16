import './Hero.css'

export default function Hero({ data, lang }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-overlay"></div>
        <div className="hero-leaves">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`leaf leaf-${i + 1}`}>🍃</div>
          ))}
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">🌿 {lang === 'he' ? 'שירותי גינון מקצועיים' : 'Professional Gardening'}</div>
        <h1 className="hero-title">{data.title}</h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <p className="hero-tagline">{data.tagline}</p>
        <a href="#contact" className="hero-cta">{data.cta}</a>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  )
}
