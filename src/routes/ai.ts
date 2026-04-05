import { Router } from "express"
import { authMiddleware } from "../middlewares/auth"

const router = Router()

router.post('/correct-description', authMiddleware, async (req, res) => {
  const { description } = req.body

  if (!description) {
    res.status(400).json({ error: 'El campo description es requerido' })
    return
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY as string,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: `Corrige únicamente los errores ortográficos del siguiente texto y devuelve solo el texto corregido sin explicaciones:\n\n${description}` }]
      })
    })

    const data = await response.json() as { content: { text: string }[] }
    console.log('Respuesta de Anthropic:', JSON.stringify(data))
    res.json({ corrected: data.content?.[0]?.text })
  } catch (error) {
    console.error('Error al llamar a Anthropic:', error)
    res.status(500).json({ error: 'Error al procesar la corrección ortográfica' })
  }
})

export default router