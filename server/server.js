import express from "express";
const app = express();

import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./utils/mongooseconfig.js";

dotenv.config();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello App Running");
});

app.listen(process.env.PORT, () => {
  console.log("server is active");
});
