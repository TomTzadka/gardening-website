import { useState } from 'react'
import enData from './data/en.json'
import heData from './data/he.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Contact from './components/Contact'
import PlantDictionary from './components/PlantDictionary'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [lang, setLang] = useState('he')
  const data = lang === 'he' ? heData : enData

  const toggleLang = () => {
    const newLang = lang === 'he' ? 'en' : 'he'
    setLang(newLang)
    document.body.className = newLang === 'he' ? 'rtl' : 'ltr'
  }

  // Set initial direction
  if (typeof document !== 'undefined') {
    document.body.className = lang === 'he' ? 'rtl' : 'ltr'
  }

  return (
    <div className="app">
      <Navbar data={data.nav} lang={lang} toggleLang={toggleLang} />
      <Hero data={data.hero} lang={lang} />
      <About data={data.about} lang={lang} />
      <Services data={data.services} lang={lang} />
      <Process data={data.process} lang={lang} />
      <Gallery data={data.gallery} lang={lang} />
      <Testimonials data={data.testimonials} lang={lang} />
      <Contact data={data.contact} lang={lang} />
      <PlantDictionary data={data.dictionary} lang={lang} />
      <Footer data={data.footer} lang={lang} />
    </div>
  )
}

export default App
