import { Request, Response } from "express";

interface ReviewParams {
  id: string;
}

// Review interface and dummy data
export interface Review {
  id: number;
  title: string;
  content: string;
  rating: number; // 1-5
}

// Dummy reviews array
export let reviews: Review[] = [
  { id: 1, title: "Awesome food", content: "Loved the tacos!", rating: 5 },
  { id: 2, title: "Good service", content: "Friendly staff.", rating: 4 },
];

// fetch all reviews
export const getAllReviews = (_req: Request, res: Response) => {
  res.status(200).json(reviews);
};

// fetch single review by ID
export const getReviewById = (req: Request<ReviewParams>, res: Response) => {
  const numericId = parseInt(req.params.id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const review = reviews.find(r => r.id === numericId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  res.status(200).json(review);
};

// create a new review
export const createReview = (req: Request<{}, {}, Omit<Review, "id">>, res: Response) => {
  const { title, content, rating } = req.body;
  if (!title || !content || rating === undefined) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newReview: Review = {
    id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
    title,
    content,
    rating: Number(rating),
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
};

// update existing review
export const updateReview = (req: Request<ReviewParams, {}, Partial<Omit<Review, "id">>>, res: Response) => {
  const numericId = parseInt(req.params.id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const reviewIndex = reviews.findIndex(r => r.id === numericId);
  if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

  const { title, content, rating } = req.body;
  if (title !== undefined) reviews[reviewIndex].title = title;
  if (content !== undefined) reviews[reviewIndex].content = content;
  if (rating !== undefined) reviews[reviewIndex].rating = Number(rating);

  res.status(200).json(reviews[reviewIndex]);
};

// delete review by ID
export const deleteReview = (req: Request<ReviewParams>, res: Response) => {
  const numericId = parseInt(req.params.id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const reviewIndex = reviews.findIndex(r => r.id === numericId);
  if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

  const deletedReview = reviews.splice(reviewIndex, 1);
  res.status(200).json(deletedReview[0]);
};