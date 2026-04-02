import { Request, Response } from "express";

export interface Review {
  id: number;
  truckId: number;
  user: string;
  comment: string;
  rating: number; // 1-5
}

export let reviews: Review[] = [
  { id: 1, truckId: 101, user: "Alice", comment: "Loved the tacos!", rating: 5 },
  { id: 2, truckId: 102, user: "Bob", comment: "Friendly staff.", rating: 4 },
];

// fetch all reviews
export const getAllReviews = (_req: Request, res: Response) => {
  res.status(200).json(reviews);
};

// fetch single review by ID
export const getReviewById = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const review = reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  res.status(200).json(review);
};

// create a new review
export const createReview = (req: Request<{}, {}, Omit<Review, "id">>, res: Response) => {
  const { truckId, user, comment, rating } = req.body;

  if (!truckId || !user || !comment || rating === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newReview: Review = {
    id: reviews.length ? reviews[reviews.length - 1].id + 1 : 1,
    truckId,
    user,
    comment,
    rating: Number(rating),
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
};

// update existing review
export const updateReview = (req: Request<{ id: string }, {}, Partial<Omit<Review, "id">>>, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const review = reviews.find(r => r.id === id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  const { truckId, user, comment, rating } = req.body;
  if (!truckId || !user || !comment || rating === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  review.truckId = truckId;
  review.user = user;
  review.comment = comment;
  review.rating = Number(rating);

  res.status(200).json(review);
};

// delete review by ID
export const deleteReview = (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ message: "Review not found" });

  const deleted = reviews.splice(index, 1);
  res.status(200).json(deleted[0]);
};