if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theaterRouter = require("./theaters/theaters.router");

//json and cors enabled
app.use(express.json());

//routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theaterRouter);

//not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

//error handler
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
