import {addNewReview, getAllReviews, getReviewById, getAllMyReviews, updateReviewById, deleteReviewById} from "../services/reviewService.js";

export async function addNewReviewHandler(req, res)
{
    const authorId = req.user.id;
    const {itemId, title, content, rating} = req.body;
    const newReview = await addNewReview({ authorId, itemId, title, content, rating});
    res.status(201).json(newReview);
}

export async function getAllReviewsHandler(req, res)
{
    const allReviews = await getAllReviews();
    res.status(200).json(allReviews);
}

export async function getReviewByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    const review = await getReviewById(id);
    res.status(200).json(review);
}

export async function getAllMyReviewsHandler(req, res)
{
    const myId = req.user.id;
    const myReviews = await getAllMyReviews(myId);
    res.status(200).json(myReviews);
}

export async function updateReviewByIdHandler(req, res)
{
    const id = parseInt(req.params.id);
    const data = {};
    const {title, content, rating} = req.body;
    if(title)
    {
        data.title = title;
    }
    if(content)
    {
        data.content = content;
    }
    if(rating)
    {
        data.rating = rating;
    }
    const updatedReview = await updateReviewById(id, data);
    res.status(200).json(updatedReview);
}

export async function deleteReviewByIdHandler(req, res)
{
    const id = req.params.id;
    await deleteReviewById(id);
    res.status(204).send();
}