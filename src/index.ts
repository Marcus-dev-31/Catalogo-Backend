import 'dotenv/config'
import express from "express";
import productsRouter from "./routes/products";
import categories from "./routes/categories";
import cors from 'cors'
import authRouter from './routes/auth'
import aiRouter from './routes/ai'
import uploadRouter from './routes/upload'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))

app.get("/", (req, res) => {
  res.json({ message: "Multitienda API funcionando" });
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categories);
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/upload', uploadRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
