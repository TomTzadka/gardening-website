import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact({ data, lang }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: data.info.email,
        name:     formData.name,
        email:    formData.email,
        message:  `טלפון: ${formData.phone}\n\n${formData.message}`,
      }, PUBLIC_KEY)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  const infoItems = [
    { icon: '📞', value: data.info.phone },
    { icon: '📧', value: data.info.email },
    { icon: '📍', value: data.info.address },
    { icon: '🕐', value: data.info.hours },
  ]

  const isHe = lang === 'he'

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            {infoItems.map((item, i) => (
              <div className="info-item" key={i}>
                <span className="info-icon">{item.icon}</span>
                <span className="info-value">{item.value}</span>
              </div>
            ))}
            <div className="contact-decoration">🌿</div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            {status === 'success' && (
              <div className="form-message form-message--success">
                ✅ {isHe ? 'ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.' : 'Message sent successfully! We\'ll be in touch soon.'}
              </div>
            )}
            {status === 'error' && (
              <div className="form-message form-message--error">
                ❌ {isHe ? 'שגיאה בשליחה. אנא נסו שוב או צרו קשר ישירות.' : 'Something went wrong. Please try again or contact us directly.'}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={data.form.name}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={data.form.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder={data.form.phone}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder={data.form.message}
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending'
                ? (isHe ? 'שולח...' : 'Sending...')
                : `${data.form.submit} 🌱`}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
