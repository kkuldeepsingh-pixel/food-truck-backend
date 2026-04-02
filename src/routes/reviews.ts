import express from "express";
import { getAllReviews, getReviewById, createReview, deleteReview } from "../controllers/reviewsController";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.delete("/:id", deleteReview);

export default router;