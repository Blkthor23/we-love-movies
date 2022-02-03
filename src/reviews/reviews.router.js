const router = require("express").Router({ mergeParams: true })
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/notAllowed")

router.route("/:reviewId")
.get(controller.read)
.delete(controller.delete)
.put(controller.update)
.all(methodNotAllowed)

router.route("/")
.get(controller.list)
.all(methodNotAllowed)
module.exports = router