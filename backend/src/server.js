import express from "express";
import mongoose from "mongoose";
import { env } from "./lib/env.js";

const app = express();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
