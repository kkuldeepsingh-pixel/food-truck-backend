import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import express, { Application } from "express";
import cors from "cors";
import reviewsRoutes from "./routes/reviews";
import menuRoutes from "./routes/menu";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

const app: Application = express();
const PORT = 5000;

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: "Too many requests, try again later" },
});

// Middleware
app.use(cors());
app.use(express.json());

// FIXED SWAGGER OPTIONS
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Truck API",
      version: "1.0.0",
      description: "API documentation for Food Truck Backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsDoc(options);

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Apply limiter
app.use("/reviews", limiter);
app.use("/login", limiter);

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