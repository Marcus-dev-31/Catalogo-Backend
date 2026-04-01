import { Router } from 'express'
import prisma from '../prisma'
import { authMiddleware } from '../middlewares/auth'

const router = Router()

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany()
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  
  const product = await prisma.product.findUnique({
    where: { id }
  })
  
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' })
    return
  }
  
  res.json(product)
})

//Crear producto
router.post('/', authMiddleware, async (req, res) => {
  const { name, price, image, description, categoryId } = req.body

  const product = await prisma.product.create({
    data: { name, price, image, description, categoryId }
  })

  res.status(201).json(product)
})

//Actualizar Producto
router.put('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  const { name, price, image, description, categoryId } = req.body

  const product = await prisma.product.update({
    where: { id },
    data: { name, price, image, description, categoryId }
  })

  res.status(200).json(product)
})

// Eliminar producto
router.delete('/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id)
  
  await prisma.product.delete({ where: { id } })
  
  res.status(204).send()
})

export default router