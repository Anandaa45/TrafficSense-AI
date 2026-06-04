import express from "express";
import multer from "multer";

const router = express.Router();
const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";

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

    const response = await fetch(`${ML_API_URL}/api/v1/analyze`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal terhubung ke API Python",
      error: error.message,
    });
  }
});

export default router;
