import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar({ data, lang, toggleLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'process', href: '#process' },
    { key: 'gallery', href: '#gallery' },
    { key: 'testimonials', href: '#testimonials' },
    { key: 'contact', href: '#contact' },
    { key: 'dictionary', href: '#dictionary' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <span className="logo-icon">🌿</span>
          <span className="logo-text">{lang === 'he' ? 'גרין מייל גננות ותחזוקה!' : 'The Green Mile (Gardening and Maintenance)'}</span>
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.key}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {data[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="lang-toggle" onClick={toggleLang}>
            {lang === 'he' ? 'EN' : 'עב'}
          </button>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}
