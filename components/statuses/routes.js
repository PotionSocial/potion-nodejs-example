const express = require("express");
const router = express.Router();
const StatusesController = require("./controller");
const Statuses = new StatusesController();

router.get("/", Statuses.getStatuses.bind(Statuses));
router.post("/", Statuses.postStatus.bind(Statuses));
router.delete("/:id", Statuses.deleteStatus.bind(Statuses));
router.put("/:id/like", Statuses.likeStatus.bind(Statuses));
router.put("/:id/unlike", Statuses.unlikeStatus.bind(Statuses));

module.exports = router;
