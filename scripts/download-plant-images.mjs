import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/plants')

const plants = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/plants.json'), 'utf8'))

// Fallback search terms for plants that don't match on Wikipedia by common name
const FALLBACK = {
  1:  'Sansevieria trifasciata',
  2:  'Zamioculcas zamiifolia',
  3:  'Epipremnum aureum',
  6:  'Ficus elastica',
  13: 'Maranta leuconeura',
  15: 'Dracaena fragrans',
  16: 'Dypsis lutescens',
  19: 'Nephrolepis exaltata',
  20: 'Asplenium nidus',
  27: 'Cereus repandus',
  28: 'Opuntia',
  32: 'Mentha',
  38: 'Salvia officinalis',
  46: 'Capsicum annuum',
  57: 'Allium fistulosum',
  67: 'Tagetes',
  69: 'Gerbera',
  74: 'Cissus rhombifolia',
  76: 'Lonicera',
  77: 'Thunbergia alata',
  79: 'Myrtus communis',
  82: 'Duranta erecta',
  86: 'Salvia rosmarinus',
  87: 'Citrus limon',
  88: 'Citrus sinensis',
  91: 'Ficus carica',
  99: 'Canna indica',
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function get(url, attempt = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, { headers: { 'User-Agent': 'PlantDictionaryBot/1.0 (educational project)' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(get(res.headers.location, attempt))
      }
      const chunks = []
      res.on('data', c => chunks.push(c))
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks) }))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

async function fetchWikiImage(name) {
  const encoded = encodeURIComponent(name)
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&format=json&pithumbsize=200&redirects=1`
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await get(url)
      if (res.status === 429) {
        await sleep(8000 + attempt * 4000)
        continue
      }
      if (res.status !== 200) return null
      const data = JSON.parse(res.body.toString())
      const pages = data.query?.pages
      if (!pages) return null
      const page = Object.values(pages)[0]
      return page?.thumbnail?.source || null
    } catch {
      await sleep(2000)
    }
  }
  return null
}

async function downloadImage(url, dest) {
  const smallUrl = url.replace(/\/\d+px-/, '/200px-')
  const res = await get(smallUrl)
  if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
  fs.writeFileSync(dest, res.body)
}

function existingFile(id) {
  for (const ext of ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']) {
    const f = path.join(OUT_DIR, `${id}.${ext}`)
    if (fs.existsSync(f)) return f
  }
  return null
}

async function main() {
  let ok = 0, fail = 0
  for (const plant of plants) {
    if (existingFile(plant.id)) {
      process.stdout.write(`  skip  [${plant.id}] ${plant.name_en}\n`)
      ok++
      continue
    }

    const searchNames = [plant.name_en]
    if (FALLBACK[plant.id]) searchNames.push(FALLBACK[plant.id])

    let imgUrl = null
    for (const name of searchNames) {
      imgUrl = await fetchWikiImage(name)
      if (imgUrl) break
      await sleep(300)
    }

    if (!imgUrl) {
      process.stdout.write(`  MISS  [${plant.id}] ${plant.name_en}\n`)
      fail++
      await sleep(400)
      continue
    }

    const rawExt = imgUrl.split('.').pop().split(/[?#]/)[0].toLowerCase()
    const ext = ['jpg','jpeg','png','gif','webp','svg'].includes(rawExt) ? rawExt : 'jpg'
    const dest = path.join(OUT_DIR, `${plant.id}.${ext}`)

    try {
      await downloadImage(imgUrl, dest)
      process.stdout.write(`  OK    [${plant.id}] ${plant.name_en}\n`)
      ok++
    } catch (e) {
      process.stdout.write(`  ERR   [${plant.id}] ${plant.name_en} — ${e.message}\n`)
      fail++
    }

    await sleep(1200)
  }
  console.log(`\nDone: ${ok} saved, ${fail} missing`)
}

main()
