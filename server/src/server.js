import express from "express";
import cors from "cors";
import mlRoutes from "./routes/mlRoutes.js";

const app = express();

const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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