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

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Fetch all reviews with optional filtering
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/", getAllReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *       404:
 *         description: Review not found
 */
router.get("/:id", getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review (Protected)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             truckId: 101
 *             user: "Kuldeep"
 *             comment: "Amazing food!"
 *             rating: 5
 *             title: "Great!"
 *             content: "Loved everything"
 *     responses:
 *       201:
 *         description: Review created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Update a review (Protected)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review updated
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticate, updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review (Protected)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteReview);

export default router;