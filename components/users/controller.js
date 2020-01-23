const UsersModel = require("./model");

module.exports = class UsersController {
  constructor() {
    this.users = new UsersModel();
  }
  //  Retrieve users from Potion API
  //
  async getUsers(req, res) {
    try {
      const users = await this.users.getUsers();
      return res.json({ status: res.statusCode, data: users });
    } catch (err) {
      return next(err);
    }
  }
};
