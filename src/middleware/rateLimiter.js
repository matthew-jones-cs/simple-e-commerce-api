import rateLimit from "express-rate-limit";

export const logInLimiter = rateLimit(
    {
        windowMs: 1*60*1000,
        limit: process.env.NODE_ENV === "test" ? 1000 : 5,
        handler: function(req, res, next)
        {
            const error = new Error("Too many log in requests. Try again later.");
            error.status = 429;
            next(error);
        }
    }
);

export const signUpLimiter = rateLimit(
    {
        windowMs: 1*5*1000,
        limit: process.env.NODE_ENV === "test" ? 1000 : 15,
        handler: function(req, res, next)
        {
            const error = new Error("Too many sign up requests. Try again later.");
            error.status = 429;
            next(error);
        }
    }
);

export const allItemsLimiter = rateLimit(
    {
        windowMs: 1*60*1000,
        limit: process.env.NODE_ENV === "test" ? 1000 : 25,
        handler: function(req, res, next)
        {
            const error = new Error("Too many get item requests. Try again later.");
            error.status = 429;
            next(error);
        }
    }
);

export const allOrdersLimiter = rateLimit(
    {
        windowMs: 1*60*1000,
        limit: process.env.NODE_ENV === "test" ? 1000 : 25,
        handler: function(req, res, next)
        {
            const error = new Error("Too many get order requests. Try again later.");
            error.status = 429;
            next(error);
        }
    }
);

export const allReviewsLimiter = rateLimit(
    {
        windowMs: 1*60*1000,
        limit: process.env.NODE_ENV === "test" ? 1000 : 25,
        handler: function(req, res, next)
        {
            const error = new Error("Too many review requests. Try again later.");
            error.status = 429;
            next(error);
        }
    }
);
