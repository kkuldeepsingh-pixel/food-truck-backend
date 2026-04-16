import express, { Application } from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviews";
import menuRoutes from "./routes/menu";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

const app: Application = express();
const PORT = 5000;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: "Too many requests, try again later",
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const token = jwt.sign({ username }, "mysecret", { expiresIn: "1h" });

  res.json({ token });
});

// Routes
app.use("/reviews", reviewsRoutes);
app.use("/menu", menuRoutes);

app.get("/", (_req, res) => {
  res.send("Food Truck Backend API is running!");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;