import { useState, useMemo } from 'react'
import plants from '../data/plants.json'
import './PlantDictionary.css'

const CATEGORY_EMOJI = {
  indoor:      '🪴',
  succulents:  '🌵',
  herbs:       '🌿',
  vegetables:  '🥬',
  flowers:     '🌸',
  climbers:    '🍃',
  shrubs:      '🌳',
  fruit_trees: '🍋',
  exotic:      '🌴',
}

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

function PlantImage({ id, emoji }) {
  const [src, setSrc] = useState(() => `/images/plants/${id}.jpg`)
  const [extIdx, setExtIdx] = useState(0)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    const next = extIdx + 1
    if (next < IMAGE_EXTS.length) {
      setExtIdx(next)
      setSrc(`/images/plants/${id}.${IMAGE_EXTS[next]}`)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    return <div className="plant-card__emoji">{emoji}</div>
  }
  return (
    <div className="plant-card__img-wrap">
      <img
        src={src}
        alt=""
        className="plant-card__img"
        onError={handleError}
        loading="lazy"
      />
    </div>
  )
}

const SUN_ICON    = { full: '☀️', partial: '⛅', shade: '🌥️' }
const WATER_ICON  = { low: '💧', medium: '💧💧', high: '💧💧💧' }
const DIFF_COLOR  = { easy: 'diff--easy', medium: 'diff--medium', hard: 'diff--hard' }

const INITIAL = { sun: 'all', watering: 'all', category: 'all', difficulty: 'all', edible: false, hydroponic: false }

const CATEGORIES = ['indoor','succulents','herbs','vegetables','flowers','climbers','shrubs','fruit_trees','exotic']

export default function PlantDictionary({ data, lang }) {
  const [filters, setFilters] = useState(INITIAL)
  const [search, setSearch]   = useState('')

  const toggle = (key, val) =>
    setFilters(f => ({ ...f, [key]: f[key] === val ? 'all' : val }))

  const toggleBool = key =>
    setFilters(f => ({ ...f, [key]: !f[key] }))

  const reset = () => { setFilters(INITIAL); setSearch('') }

  const filtered = useMemo(() => plants.filter(p => {
    if (filters.sun        !== 'all' && p.sun        !== filters.sun)        return false
    if (filters.watering   !== 'all' && p.watering   !== filters.watering)   return false
    if (filters.category   !== 'all' && p.category   !== filters.category)   return false
    if (filters.difficulty !== 'all' && p.difficulty !== filters.difficulty) return false
    if (filters.edible     && !p.edible)     return false
    if (filters.hydroponic && !p.hydroponic) return false
    if (search) {
      const q    = search.toLowerCase()
      const name = (lang === 'he' ? p.name_he : p.name_en).toLowerCase()
      if (!name.includes(q)) return false
    }
    return true
  }), [filters, search, lang])

  const f = data.filters
  const isActive = filters.sun !== 'all' || filters.watering !== 'all' ||
    filters.category !== 'all' || filters.difficulty !== 'all' ||
    filters.edible || filters.hydroponic || search

  return (
    <section className="plant-dict" id="dictionary">
      <div className="plant-dict__header">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
      </div>

      <div className="plant-dict__controls">
        <div className="plant-dict__top-row">
          <input
            className="plant-dict__search"
            type="search"
            placeholder={data.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="plant-dict__count">
            {filtered.length} {data.count}
          </span>
          {isActive && (
            <button className="filter-reset" onClick={reset}>{f.reset}</button>
          )}
        </div>

        <div className="plant-dict__filters">

          {/* Sun */}
          <div className="filter-group">
            <span className="filter-label">☀️ {f.sun}</span>
            {['full','partial','shade'].map(v => (
              <button key={v}
                className={`filter-btn ${filters.sun === v ? 'active' : ''}`}
                onClick={() => toggle('sun', v)}
              >{f[`sun_${v}`]}</button>
            ))}
          </div>

          {/* Watering */}
          <div className="filter-group">
            <span className="filter-label">💧 {f.watering}</span>
            {['low','medium','high'].map(v => (
              <button key={v}
                className={`filter-btn ${filters.watering === v ? 'active' : ''}`}
                onClick={() => toggle('watering', v)}
              >{f[`water_${v}`]}</button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="filter-group">
            <span className="filter-label">🌱 {f.difficulty}</span>
            {['easy','medium','hard'].map(v => (
              <button key={v}
                className={`filter-btn ${filters.difficulty === v ? 'active' : ''}`}
                onClick={() => toggle('difficulty', v)}
              >{f[`diff_${v}`]}</button>
            ))}
          </div>

          {/* Edible / Hydroponic toggles */}
          <div className="filter-group">
            <button
              className={`filter-btn filter-btn--toggle ${filters.edible ? 'active' : ''}`}
              onClick={() => toggleBool('edible')}
            >🍽️ {f.edible}</button>
            <button
              className={`filter-btn filter-btn--toggle ${filters.hydroponic ? 'active' : ''}`}
              onClick={() => toggleBool('hydroponic')}
            >💧 {f.hydroponic}</button>
          </div>

        </div>

        {/* Category chips — full row */}
        <div className="filter-group filter-group--categories">
          <span className="filter-label">🗂 {f.category}</span>
          {CATEGORIES.map(v => (
            <button key={v}
              className={`filter-btn ${filters.category === v ? 'active' : ''}`}
              onClick={() => toggle('category', v)}
            >{CATEGORY_EMOJI[v]} {f.categories[v]}</button>
          ))}
        </div>
      </div>

      <div className="plant-dict__body">
        {filtered.length === 0 ? (
          <p className="plant-dict__empty">{data.noResults}</p>
        ) : (
          <div className="plant-grid">
            {filtered.map(plant => (
              <div className="plant-card" key={plant.id}>
                <PlantImage id={plant.id} emoji={CATEGORY_EMOJI[plant.category]} />
                <div className="plant-card__content">
                  <h3 className="plant-card__name">
                    {lang === 'he' ? plant.name_he : plant.name_en}
                  </h3>
                  {lang === 'en' && (
                    <p className="plant-card__name-he">{plant.name_he}</p>
                  )}
                  <p className="plant-card__desc">{plant.notes}</p>
                  <div className="plant-card__meta">
                    <span className="plant-card__height">↕ {plant.height_cm} ס״מ</span>
                  </div>
                  <div className="plant-card__badges">
                    <span className="badge badge--sun">{SUN_ICON[plant.sun]}</span>
                    <span className="badge badge--water">{WATER_ICON[plant.watering]}</span>
                    <span className={`badge badge--diff ${DIFF_COLOR[plant.difficulty]}`}>
                      {f[`diff_${plant.difficulty}`]}
                    </span>
                    {plant.edible     && <span className="badge badge--edible">🍽️</span>}
                    {plant.hydroponic && <span className="badge badge--hydro">💧</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
