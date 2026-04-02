import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server running "
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});