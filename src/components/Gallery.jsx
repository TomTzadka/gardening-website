import { useState } from 'react'
import Lightbox from './Lightbox'
import './Gallery.css'

export default function Gallery({ data }) {
  const [lightbox, setLightbox] = useState(null)

  const imgSrc = (folder, image) =>
    folder ? `/images/${folder}/${encodeURIComponent(image)}` : `/images/${image}`

  const handleClick = item => {
    if (item.projectImages) {
      setLightbox(item)
    }
  }

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </div>
        <div className="gallery-grid">
          {data.items.map((item, i) => (
            <div
              className={`gallery-item ${item.projectImages ? 'is-project' : ''}`}
              key={i}
              onClick={() => handleClick(item)}
            >
              <div className="gallery-thumb">
                <img
                  src={imgSrc(item.folder, item.image)}
                  alt={item.title}
                  className="gallery-img"
                  onError={e => { e.target.style.display = 'none' }}
                />
                {item.projectImages && (
                  <div className="project-badge">
                    <span className="project-badge-icon">⊞</span>
                    {item.projectImages.length} תמונות
                  </div>
                )}
                <div className="gallery-overlay">
                  <span className="gallery-category">{item.category}</span>
                  <h3 className="gallery-title">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          folder={lightbox.folder}
          images={lightbox.projectImages}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
