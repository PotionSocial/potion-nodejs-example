const express = require("express");
const router = express.Router();
const UsersController = require("./controller");
const Users = new UsersController();

router.get("/", Users.getUsers.bind(Users));

module.exports = router;
