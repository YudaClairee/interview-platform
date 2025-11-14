import express from "express";
import { env } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, inngestFunctions } from "./lib/inngest.js";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" });
});

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: inngestFunctions,
  })
);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
