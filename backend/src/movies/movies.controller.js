const moviesService = require("./movies.service");

const list = async (req, res, next) => {
  const defaultMovies = await moviesService.list();
  const showingMovies = await moviesService.isShowing();
  const { is_showing } = req.query;
  const content = is_showing ? showingMovies : defaultMovies;
  return res.json({ data: content });
};
const hasId = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await moviesService.read(Number(movieId));

  if (movie) {
    res.locals.movie = movie;
    return next();
  } else {
    next({ status: 404, message: "Movie not found" });
  }
};

const read = async (req, res, next) => {
  const movie = res.locals.movie;
  res.json({ data: movie });
};

module.exports = {
  list,
  read: [hasId, read],
  hasId,
};
