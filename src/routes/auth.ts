import 'dotenv/config'
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import prisma from "../prisma";
import rateLimit from 'express-rate-limit';

const router = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intentá de nuevo en 15 minutos.' },
})

router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            res.status(401).json({ error: 'Credenciales inválidas' })
            return
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            res.status(401).json({ error: 'Credenciales inválidas' })
            return
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        )

        res.json({ token })
    } catch {
        res.status(500).json({ error: 'Error al iniciar sesión' })
    }
})

export default router;
