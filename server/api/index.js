import express from "express";
import cors from "cors";
import router from "../src/routes/index.js";
import mlRoutes from "../src/routes/mlRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api/ml", mlRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "TrafficSense AI API is running",
  });
});

export default app;
