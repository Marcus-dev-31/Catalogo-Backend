import { Router } from 'express'
import prisma from '../prisma'
import { authMiddleware } from '../middlewares/auth'


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

//Crear categoria
router.post('/', authMiddleware, async (req, res) => {
  const { name, emoji, slug, color, pale, gradient } = req.body

  const category = await prisma.category.create({
    data: { name, emoji, slug, color, pale, gradient }
  })

  res.status(201).json(category)
})

//Actualizar Producto
router.put('/:slug', authMiddleware, async (req, res) => {
  const slug = req.params.slug as string
  const { name, emoji, slug: newSlug, color, pale, gradient } = req.body

  const category = await prisma.category.update({
    where: { slug },
    data: { name, emoji, slug: newSlug, color, pale, gradient }
  })

  res.status(200).json(category)
})

// Eliminar categoria
router.delete('/:slug', authMiddleware, async (req, res) => {
  const slug = req.params.slug as string
  
  await prisma.category.delete({ where: { slug } })
  
  res.status(204).send()
})

export default router