import prisma from "../config/db.js";

export async function createNewReview(data)
{
    try
    {
        const newReview = await prisma.review.create({data});
        return newReview;
    }
    catch(error)
    {
        if(error.code === "P2003")
        {
            const err = new Error("The referenced item does not exist.");
            err.status = 404;
            throw err;
        }
        throw error;
    }
}

export async function findAllReviews()
{
    const allReviews = await prisma.review.findMany();
    return allReviews;
}

export async function findReviewById(id)
{
    const review = await prisma.review.findUnique({where: {id:id}});
    return review;
}

export async function findAllMyReviews(myId)
{
    const myReviews = await prisma.review.findMany({where: {authorId: myId}});
    return myReviews;
}

export async function updateReview(id, data)
{
    const updatedReview = await prisma.review.update({where: {id: id}, data: data});
    return updatedReview;
}

export async function removeReviewById(id)
{
    try
    {
        const deletedReview = await prisma.review.delete({where: {id: parseInt(id)}});
        return deletedReview;
    }
    catch(error)
    {
        if(error.code === "P2025")
        {
            return null;
        }
        throw error;
    }
}