import { Router } from 'express'
import type { Category } from '../types'

const router = Router()

const category: Category[] = [
    {
    id: 1,
    name: "Ropa",
    emoji: "👗",
    slug: "ropa",
    color: "#FF4500",
    pale: "#FFF0EB",
    gradient: "linear-gradient(145deg, #FF4500, #FF7843)"
  },
  {
    id: 2,
    name: "Juguetes",
    emoji: "🧸",
    slug: "juguetes",
    color: "#D49500",
    pale: "#FFFBE6",
    gradient: "linear-gradient(145deg, #D49500, #FFCC00)"
  }
]

router.get('/', (req, res) => {
  res.json(category)
})

router.get('/:slug', (req, res) => {
  const slug = req.params.slug
  
  const category_found = category.find(c => c.slug === slug)
  
  if (!category_found) {
    res.status(404).json({ error: 'Categoria no encontrada' })
    return
  }
  
  res.json(category_found)
})

export default router