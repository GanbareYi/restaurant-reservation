const router = require("express").Router();
const { route } = require("../app");
const controller = require("./tables.controller");

router.route("/").post(controller.create);
router.route("/:table_id").put(controller.update);

module.exports = router;