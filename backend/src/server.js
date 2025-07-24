import express from "express";
import cors from "cors"; // ✅ Add this line
import notesRoute from './routes/notesRoute.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import RateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// ✅ Add CORS middleware before any routes
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend origin
  credentials: true // optional: allow cookies if used
}));

// built-in middleware
app.use(express.json());
app.use(RateLimiter);

// routes
app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});