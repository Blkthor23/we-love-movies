const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/notAllowed")
const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

router.use("/:movieId/theaters", controller.hasId, theatersRouter)
router.use("/:movieId/reviews", controller.hasId, reviewsRouter)

router.route("/:movieId").get(controller.read).all(methodNotAllowed)

router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router