import express from "express";
import multer from "multer";

const router = express.Router();
const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";

const upload = multer({
  storage: multer.memoryStorage(),
});

function createFallbackAnalysis(file) {
  const seed = file.size + file.originalname.length;
  const motorcycle = (seed % 28) + 12;
  const car = (Math.floor(seed / 3) % 24) + 8;
  const bus = (Math.floor(seed / 5) % 6) + 1;
  const truck = (Math.floor(seed / 7) % 8) + 1;
  const total = motorcycle + car + bus + truck;
  const totalSmp = motorcycle * 0.5 + car + bus * 1.3 + truck * 1.3;

  let status = "LANCAR";
  if (totalSmp >= 25) status = "MACET";
  else if (totalSmp >= 15) status = "PADAT";

  return {
    status: "success",
    mode: "fallback",
    message: "API Python belum berjalan, hasil sementara dibuat oleh backend.",
    data: {
      total_kendaraan: total,
      rincian: {
        Motorcycle: motorcycle,
        Car: car,
        Bus: bus,
        Truck: truck,
      },
      kemacetan: {
        status,
        total_smp: Number(totalSmp.toFixed(1)),
      },
      garis_y_dipakai: null,
      tipe_file: file.mimetype.startsWith("video/") ? "video" : "image",
      pesan_ai_advisor:
        "API Python belum aktif. Jalankan FastAPI ML untuk hasil deteksi model sebenarnya.",
    },
  };
}

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
    return res.json(createFallbackAnalysis(req.file));
  }
});

export default router;
