import express from "express";
// import mongoose from "mongoose";
import { env } from "./lib/env.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const PORT = env.PORT;

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

// make ready for deployment
if (env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
