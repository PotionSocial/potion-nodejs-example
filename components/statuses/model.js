const HttpService = require("./../../services/http");

module.exports = class StatusesModel {
  constructor() {
    this.https = new HttpService();
  }
  getStatuses(params) {
    return this.https.get("/statuses?" + params);
  }
  postStatus(params) {
    return this.https.post("/statuses", params);
  }
  deleteStatus(id) {
    return this.https.delete("/statuses/" + id);
  }
  likeStatus(id, params) {
    return this.https.put("/statuses/" + id + "/like?" + params);
  }
  unlikeStatus(id, params) {
    return this.https.put("/statuses/" + id + "/unlike?" + params);
  }
};
