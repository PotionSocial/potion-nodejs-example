const StatusesModel = require("./model");
const ejs = require("ejs");
const fs = require("fs");
const nl2br = require("nl2br");
const moment = require("moment");
const querystring = require("querystring");

module.exports = class StatusesController {
  constructor() {
    this.status = new StatusesModel();
  }
  //  Retrieve statuses from Potion API and return them in compiled html
  //
  async getStatuses(req, res, next) {
    try {
      const statuses = await this.status.getStatuses(
        querystring.stringify(req.query)
      );

      var filePath = process.env.PWD + "/views/partials/status.ejs";
      var template = fs.readFileSync(filePath, "utf8");
      var compiledHTML = "";

      if (statuses && statuses.items && statuses.items.length > 0) {
        for (var i = 0, len = statuses.items.length; i < len; i++) {
          compiledHTML =
            compiledHTML +
            ejs.render(template, {
              moment: moment,
              nl2br: nl2br,
              status: statuses.items[i]
            });
        }
      }

      return res.json({
        status: res.statusCode,
        data: compiledHTML
      });
    } catch (err) {
      return next(err);
    }
  }

  //  Post a status on Potion API and return it in compiled html
  //
  async postStatus(req, res, next) {
    try {
      if (!req.body) {
        return res
          .status(400)
          .json({ status: 400, error: "Parameters are missing" });
      }
      const status = await this.status.postStatus(req.body);

      if (status.status !== 201) {
        return res
          .status(status.status)
          .json({ status: status.status, error: status.error });
      }

      var filePath = process.env.PWD + "/views/partials/status.ejs";
      var template = fs.readFileSync(filePath, "utf8");
      var compiledHTML = ejs.render(template, {
        moment: moment,
        nl2br: nl2br,
        status: status.data
      });

      return res
        .status(status.status)
        .json({ status: status.status, data: compiledHTML });
    } catch (err) {
      return next(err);
    }
  }

  //  Delete a status from Potion API
  //
  async deleteStatus(req, res, next) {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: 400, error: "Parameters are missing" });
      }
      const status = await this.status.deleteStatus(req.params.id);

      if (status && status !== 200) {
        return res
          .status(status.status)
          .json({ status: status.status, error: status.error });
      }

      return res.status(200).json({ status: 200 });
    } catch (err) {
      return next(err);
    }
  }

  //  Like a status from Potion API
  //
  async likeStatus(req, res, next) {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: 400, error: "Parameters are missing" });
      }
      const like = await this.status.likeStatus(
        req.params.id,
        querystring.stringify(req.query)
      );

      if (like && like.status) {
        return res
          .status(like.status)
          .json({ status: like.status, error: like.error });
      }

      return res.status(200).json({ status: 200, total: like });
    } catch (err) {
      return next(err);
    }
  }

  //  Unlike a status from Potion API
  //
  async unlikeStatus(req, res, next) {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: 400, error: "Parameters are missing" });
      }
      const status = await this.status.unlikeStatus(
        req.params.id,
        querystring.stringify(req.query)
      );
      if (status && status !== 200) {
        return res
          .status(status.status)
          .json({ status: status.status, error: status.error });
      }

      return res.status(200).json({ status: 200 });
    } catch (err) {
      return next(err);
    }
  }
};
