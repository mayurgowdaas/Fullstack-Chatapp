import { server, app } from "./lib/socketio.js";
import dotenv from "dotenv";
import authRoutes from "./route/auth.route.js";
import messageRoute from "./route/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieparser from "cookie-parser";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
