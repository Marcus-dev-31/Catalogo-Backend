import 'dotenv/config'
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import prisma from "../prisma";

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        res.status(401).json({ error: 'Credenciales Invalidas' })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        res.status(401).json({ error: 'Credenciales Invalidad' })
        return
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
    )

    res.json({ token })
})

export default router;
