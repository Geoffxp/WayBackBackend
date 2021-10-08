const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./images.controller");

router.route("/:img_id").get(controller.getImage).all(methodNotAllowed);

module.exports = router;