import express from "express";
import mongoose from 'mongoose';
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes  from "./routes/users.routes.js";
// import notificationRoutes from "./routes/notifications.route.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors({
  origin: [
    "http://localhost:3001",
    "https://videocallhack.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors()); // Enables pre-flight across all routes

app.use(express.json({ limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }))

app.use("/api/v1/users", userRoutes);
// app.use("/api/notifications", notificationRoutes);

const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(
    "mongodb+srv://tripathishubham438:0rrw1kwXaHOV0Ucq@cluster0.j16dv.mongodb.net/"
  );

  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
  server.listen(app.get("port"), () => {
    console.log("LISTEN ON PORT 8000");
  });
};

start();
