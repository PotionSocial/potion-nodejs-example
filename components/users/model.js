const HttpService = require("./../../services/http");

module.exports = class UsersModel {
  constructor() {
    this.https = new HttpService();
  }
  getUsers() {
    return this.https.get("/users");
  }
};
