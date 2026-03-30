import 'dotenv/config'
import express from "express";
import productsRouter from "./routes/products";
import categories from "./routes/categories";
import cors from 'cors'
import authRouter from './routes/auth'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.get("/", (req, res) => {
  res.json({ message: "Multitienda API funcionando" });
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categories);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
