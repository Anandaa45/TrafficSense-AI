import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import mlRoutes from "./routes/mlRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", router);
app.use("/api/ml", mlRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "TrafficSense backend berjalan",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Terjadi kesalahan pada server.",
  });
});
