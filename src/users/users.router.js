const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./users.controller");

router.route("/")
    .get(controller.getGamer)
    .post(controller.create)
    .put(controller.read)
    .all(methodNotAllowed)

module.exports = router;
