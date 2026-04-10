import express, { Application } from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviews";
import menuRoutes from "./routes/menu";
import rateLimit from "express-rate-limit";

const app: Application = express();
const PORT = 5000;
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests
  message: "Too many requests, try again later",
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/reviews", reviewsRoutes);
app.get("/", (_req, res) => {
  res.send("Food Truck Backend API is running!");
});

app.use("/menu", menuRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;