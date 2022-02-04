const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")


const read = (reviewId) => {
    return knex("reviews as r")
    .select("r.*")
    .where({review_id: reviewId})
    .first()
}

const readCritic = async (criticId) => {
    return knex("critics")
    .select("*")
    .where({critic_id: criticId })
    .first()
  }

const addCritic = async(review) => {
    review.critic = await readCritic(review.critic_id);
    return review;
}

const update = (updatedReview) => {
    return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id).then(addCritic))
    
}

const destroy = (reviewId) => {
    return knex("reviews as r")
    .select("*")
    .where({review_id: reviewId})
    .del()
}

const list = async(movieId) => {   
    return knex("reviews")
    .where({ movie_id: movieId })
    .then((reviews) => Promise.all(reviews.map(addCritic))); 
}

module.exports = {
    list,
    read,
    update,
    delete: destroy,
    readCritic,
}