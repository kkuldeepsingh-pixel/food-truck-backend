import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from "../controllers/reviewsController";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// PUBLIC ROUTES
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

// PROTECTED ROUTES
router.post("/", authenticate, createReview);
router.put("/:id", authenticate, updateReview);
router.delete("/:id", authenticate, deleteReview);

export default router;