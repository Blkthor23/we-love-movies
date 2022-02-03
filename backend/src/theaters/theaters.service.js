const knex = require("../db/connection");

const list = () => {
    return knex("theaters as t")
    .select("*")
}

const foundMovies = (theaterId) => {
    return knex("movies_theaters as mt")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .where({theater_id: theaterId})
    .select("m.*", "mt.is_showing", "mt.theater_id")
}

const foundTheaters = (movieId) => {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({movie_id: movieId})
    .select("t.*", "mt.is_showing", "mt.movie_id")
}
module.exports = {
    list,
    foundTheaters,
    foundMovies,
}