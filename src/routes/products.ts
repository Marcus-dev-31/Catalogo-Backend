import { Router } from 'express'
import prisma from '../prisma'

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

export default router