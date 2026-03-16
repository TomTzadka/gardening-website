import './Footer.css'

export default function Footer({ data, lang }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span>🌿</span>
                <span>{lang === 'he' ? 'גרין מייל גננות ותחזוקה!' : 'The Green Mile (Gardening and Maintenance)'}</span>
              </div>
              <p className="footer-tagline">{data.tagline}</p>
            </div>
            <div className="footer-links-group">
              <div className="footer-social">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="WhatsApp">💬</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {year} {lang === 'he' ? 'גרין מייל גננות ותחזוקה!' : 'The Green Mile (Gardening and Maintenance)'} — {data.rights}</p>
        </div>
      </div>
    </footer>
  )
}
