import { Router } from 'express'
import prisma from '../prisma'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { images: { orderBy: { order: 'asc' } } }
    })
    res.json(products)
  } catch {
    res.status(500).json({ error: 'Error al obtener productos' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: 'asc' } } }
    })

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' })
      return
    }

    res.json(product)
  } catch {
    res.status(500).json({ error: 'Error al obtener el producto' })
  }
})

//Crear producto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body

    const product = await prisma.product.create({
      data: { name, price, description, categoryId }
    })

    res.status(201).json(product)
  } catch {
    res.status(500).json({ error: 'Error al crear el producto' })
  }
})

//Actualizar Producto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, price, description, categoryId } = req.body

    const product = await prisma.product.update({
      where: { id },
      data: { name, price, description, categoryId }
    })

    res.status(200).json(product)
  } catch {
    res.status(500).json({ error: 'Error al actualizar el producto' })
  }
})

// Eliminar producto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)

    await prisma.product.delete({ where: { id } })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Error al eliminar el producto' })
  }
})

// Agregar imagen a un producto
router.post('/:id/images', authMiddleware, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { url, order } = req.body

    const image = await prisma.productImage.create({
      data: { url, order: order ?? 0, productId: id }
    })

    res.status(201).json(image)
  } catch {
    res.status(500).json({ error: 'Error al agregar la imagen' })
  }
})

// Eliminar imagen de un producto
router.delete('/:id/images/:imageId', authMiddleware, async (req, res) => {
  try {
    const imageId = Number(req.params.imageId)

    await prisma.productImage.delete({ where: { id: imageId } })

    res.status(204).send()
  } catch {
    res.status(500).json({ error: 'Error al eliminar la imagen' })
  }
})

export default router
