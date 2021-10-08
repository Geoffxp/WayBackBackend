const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./games.controller");

router.route("/:id")
    .get(controller.read)
    .all(methodNotAllowed)
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;