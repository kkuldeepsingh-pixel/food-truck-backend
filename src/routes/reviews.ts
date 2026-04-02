import { Router } from "express";
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from "../controllers/reviewsController";

const router = Router();

// GET all reviews
router.get("/", getAllReviews);

// GET a single review by ID
router.get("/:id", getReviewById);

// POST a new review
router.post("/", createReview);

// PUT to update an existing review
router.put("/:id", updateReview);

// DELETE a review
router.delete("/:id", deleteReview);

export default router;