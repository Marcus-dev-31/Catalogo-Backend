import { Router } from 'express'
import prisma from '../prisma'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch {
    res.status(500).json({ error: 'Error al obtener categorías' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug

    const category = await prisma.category.findUnique({ where: { slug } })

    if (!category) {
      res.status(404).json({ error: 'Categoria no encontrada' })
      return
    }

    res.json(category)
  } catch {
    res.status(500).json({ error: 'Error al obtener la categoría' })
  }
})

//Crear categoria
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, emoji, slug, color, pale, gradient } = req.body

    const category = await prisma.category.create({
      data: { name, emoji, slug, color, pale, gradient }
    })

    res.status(201).json(category)
  } catch {
    res.status(500).json({ error: 'Error al crear la categoría' })
  }
})

//Actualizar Categoria
router.put('/:slug', authMiddleware, async (req, res) => {
  try {
    const slug = req.params.slug as string
    const { name, emoji, slug: newSlug, color, pale, gradient } = req.body

    const category = await prisma.category.update({
      where: { slug },
      data: { name, emoji, slug: newSlug, color, pale, gradient }
    })

    res.status(200).json(category)
  } catch {
    res.status(500).json({ error: 'Error al actualizar la categoría' })
  }
})

// Eliminar categoria
router.delete('/:slug', authMiddleware, async (req, res) => {
  try {
    const slug = req.params.slug as string

    await prisma.category.delete({ where: { slug } })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Error al eliminar la categoría' })
  }
})

export default router
