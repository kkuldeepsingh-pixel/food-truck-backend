import { Request, Response } from "express";

interface ReviewParams {
  id: string;
}

// Review interface and dummy data
interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
}

let reviews: Review[] = [
  { id: 1, title: "Awesome food", content: "Loved the tacos!", rating: 5 },
  { id: 2, title: "Good service", content: "Friendly staff.", rating: 4 },
];

// GET /reviews
export const getAllReviews = (_req: Request, res: Response) => {
  res.json(reviews);
};

// GET /reviews/:id
export const getReviewById = (req: Request<ReviewParams>, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const review = reviews.find(r => r.id === numericId);
  if (!review) return res.status(404).json({ message: "Review not found" });

  res.json(review);
};

// POST /reviews
export const createReview = (req: Request, res: Response) => {
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

// PUT /reviews/:id
export const updateReview = (req: Request<ReviewParams>, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const reviewIndex = reviews.findIndex(r => r.id === numericId);
  if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

  const { title, content, rating } = req.body;
  if (title !== undefined) reviews[reviewIndex].title = title;
  if (content !== undefined) reviews[reviewIndex].content = content;
  if (rating !== undefined) reviews[reviewIndex].rating = Number(rating);

  res.json(reviews[reviewIndex]);
};

// DELETE /reviews/:id
export const deleteReview = (req: Request<ReviewParams>, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) return res.status(400).json({ message: "Invalid ID" });

  const reviewIndex = reviews.findIndex(r => r.id === numericId);
  if (reviewIndex === -1) return res.status(404).json({ message: "Review not found" });

  const deletedReview = reviews.splice(reviewIndex, 1);
  res.json(deletedReview[0]);
};