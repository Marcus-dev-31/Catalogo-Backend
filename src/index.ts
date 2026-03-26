import express from "express";
import productsRouter from "./routes/products";
import categories from "./routes/categories";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Multitienda API funcionando" });
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categories);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
