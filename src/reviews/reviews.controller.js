const reviewService = require("./reviews.service");

const destroy = async (req, res, next) => {
  const { reviewId } = req.params;
  await reviewService.delete(Number(reviewId));
  res.sendStatus(204);
};

const reviewIdExist = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewService.read(Number(reviewId));

  if (review) {
    res.locals.review = review;
    return next();
  } else {
    next({
      status: 404,
      message: "Review cannot be found.",
    });
  }
};
const list = async (req, res) => {
  const data = await reviewService.list(req.params.movieId);
  res.json({ data });
};

const read = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await reviewService.read();
  const singleReview = await reviewService.singleReview(Number(reviewId));
  const content = reviewId ? singleReview : review;
  res.json({ data: content });
};

const update = async (req, res, next) => {
  const { reviewId } = req.params;

  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  const newReview = await reviewService.update(updatedReview);
  res.json({ data: newReview });
};

module.exports = {
  delete: [reviewIdExist, destroy],
  read,
  update: [reviewIdExist, update],
  list,
};
