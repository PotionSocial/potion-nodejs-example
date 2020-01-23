var express = require("express");
var router = express.Router();

//  Return base app view
//
router.get("/", function(req, res, next) {
  res.render("index");
});

module.exports = router;
