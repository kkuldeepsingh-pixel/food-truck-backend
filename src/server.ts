import express, { Application } from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviews";
import menuRoutes from "./routes/menu";

const app: Application = express();
const PORT = 5000;

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