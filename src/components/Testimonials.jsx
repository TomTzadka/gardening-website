import './Testimonials.css'

export default function Testimonials({ data }) {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-bg">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{data.title}</h2>
          </div>
          <div className="testimonials-grid">
            {data.items.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-location">📍 {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
