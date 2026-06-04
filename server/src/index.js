import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import mlRoutes from "./routes/mlRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "TrafficSense backend berjalan",
  });
});

app.use("/api", router);
app.use("/api/ml", mlRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Terjadi kesalahan pada server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
