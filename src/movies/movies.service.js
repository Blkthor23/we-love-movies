const knex = require("../db/connection");

const list = () => {
    return knex("movies")
    .select("*")
}
const isShowing = () => {
    return knex("movies as m")
    .join("movies_theaters as mv", "m.movie_id", "mv.movie_id")
    .select("m.*")
    .where({is_showing: true})
    .groupBy("m.movie_id")
}

const read = (movieId) => {
    return knex("movies")
    .select("*")
    .where({movie_id: movieId})
    .first()
}
module.exports = {
    list,
    isShowing,
    read,
}