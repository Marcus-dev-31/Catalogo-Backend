import { Router } from 'express'
import prisma from '../prisma'


const router = Router()

router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany()
  res.json(categories)
})

router.get('/:slug', async (req, res) => {
  const slug = req.params.slug

  const category = await prisma.category.findUnique({ where: {slug} })

  if (!category) {
    res.status(404).json({ error: 'Categoria no encontrada' })
    return
  }

  res.json(category)
})

export default router