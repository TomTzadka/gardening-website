import { useEffect, useState } from 'react'
import './Lightbox.css'

export default function Lightbox({ folder, images, title, onClose }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index])

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  const src = img => `/images/${folder}/${encodeURIComponent(img)}`

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-box" onClick={e => e.stopPropagation()}>

        <div className="lightbox-header">
          <span className="lightbox-title">{title}</span>
          <span className="lightbox-counter">{index + 1} / {images.length}</span>
          <button className="lightbox-close" onClick={onClose}>✕</button>
        </div>

        <div className="lightbox-main">
          <button className="lightbox-arrow lightbox-arrow--prev" onClick={prev}>&#8249;</button>
          <img
            key={index}
            src={src(images[index])}
            alt={`${title} ${index + 1}`}
            className="lightbox-img"
          />
          <button className="lightbox-arrow lightbox-arrow--next" onClick={next}>&#8250;</button>
        </div>

        <div className="lightbox-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`lightbox-thumb ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            >
              <img src={src(img)} alt={`thumb ${i + 1}`} />
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
