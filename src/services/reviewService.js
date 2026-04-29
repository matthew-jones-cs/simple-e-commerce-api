import {createNewReview, findAllReviews, findReviewById, findAllMyReviews, updateReview, removeReviewById} from "../repositories/reviewRepo.js";

function thereOrNot(id, review)
{
    if (review)
    {
        return review;
    }
    else
    {
        const error = new Error(`Review ${id} not found`);
        error.status = 404;
        throw error;
    }
}

export async function addNewReview(data)
{
    const newReview = await createNewReview(data);
    return newReview;
}

export async function getAllReviews()
{
    const allReviews = await findAllReviews();
    return allReviews;
}

export async function getReviewById(id)
{
    const review = await findReviewById(id);
    return thereOrNot(id, review);
}

export async function getAllMyReviews(myId)
{
    const myReviews = await findAllMyReviews(myId);
    return myReviews;
}

export async function updateReviewById(id, data)
{
    const updatedReview = await updateReview(id, data);
    return thereOrNot(id, updatedReview);
}

export async function deleteReviewById(id)
{
    const deletedReview = await removeReviewById(id);
    if (deletedReview)
    {
        return ;
    }
    else
    {
        const error = new Error(`Review ${id} not found`);
        error.status = 404;
        throw error;
    }
}