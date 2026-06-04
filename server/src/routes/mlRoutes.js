import express from "express";
import multer from "multer";

const router = express.Router();
const ML_API_URL = process.env.ML_API_URL || "http://127.0.0.1:5001";

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/predict", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "File wajib dikirim dengan field name 'file'",
      });
    }

    const formData = new FormData();

    const blob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    formData.append("file", blob, req.file.originalname);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${ML_API_URL}/api/v1/analyze`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(503).json({
      status: "error",
      message:
        "AI Python belum aktif atau tidak dapat dijangkau. Jalankan FastAPI ML agar prediksi kendaraan memakai model YOLO.",
    });
  }
});

export default router;
