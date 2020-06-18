var express = require("express");
var router = express.Router();
var AgendaController = require("../controller/AgendaController");

router.get("/list",AgendaController.list);
router.get("/search",AgendaController.search);
router.post("/create",AgendaController.create);
router.delete("/delete",AgendaController.delete);
module.exports = router;