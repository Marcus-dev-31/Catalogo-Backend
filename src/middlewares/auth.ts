import { Request, Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import 'dotenv/config'

export function authMiddleware( req: Request, res: Response, next: NextFunction ) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token requerido' })
        return
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        next()
    } catch {
        res.status(401).json({ error: 'Token Invalido' })
    }
}