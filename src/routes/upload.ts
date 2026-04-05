import 'dotenv/config'
import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/auth";
import cloudinary from "../cloudinary";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), authMiddleware, async (req, res) => {
    console.log('Upload endpoint alcanzado')
  console.log('req.file:', req.file)
  console.log('req.body:', req.body)

  if (!req.file) {
    res.status(400).json({ error: "No se recibió ninguna imagen" });
    return;
  }

  const result = (await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "multitienda", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve({ secure_url: result.secure_url });
            else reject(new Error("No result"));
          },
        )
        .end(req.file!.buffer);
    },
  )) as { secure_url: string };

  res.json({ url: result.secure_url });
});

export default router;
