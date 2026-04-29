import { getReviewById } from "../services/reviewService.js";
import { getItemById } from "../services/itemService.js";
import {getOrderById} from "../services/orderService.js";

export async function authorizeReviewOwnership(req, res, next)
{
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (review.authorId !== req.user.id) // the authorId might need to be author_id
  {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}

export async function authorizeItemOwnership(req, res, next)
{
  const id = parseInt(req.params.id);
  const item = await getItemById(id);
  if (item.sellerId !== req.user.id)
  {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}

export async function authorizeOrderOwnership(req, res, next)
{
  const id = parseInt(req.params.id);
  const order = await getOrderById(id);
  if (order.buyerId !== req.user.id)
  {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
}