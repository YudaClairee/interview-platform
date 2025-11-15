import express from "express";
import { env } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, inngestFunctions } from "./lib/inngest.js";
import path from "path";
import { ENV } from "./lib/env.js";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

const __dirname = path.resolve();

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

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

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
