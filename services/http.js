var https = require("https");
var axios = require("axios");
var env = require("./../config");

console.log("env", env);

module.exports = class HttpService {
  constructor() {
    this.request = axios.create(this.setConfig());
  }

  setConfig() {
    const defaultConfig = {
      baseURL: env.POTION_API_URL,
      headers: {
        common: {
          "Api-Key": env.POTION_API_KEY,
          "Api-Secret": env.POTION_API_SECRET,
          "Content-Type": "application/json;charset=UTF-8"
        }
      }
    };

    //  Conditionnal config to avoid certificate problem with localhost
    //
    if (env.NODE_ENV === "development") {
      return {
        ...defaultConfig,
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
          requestCert: true,
          keepAlive: true
        })
      };
    } else {
      return defaultConfig;
    }
  }

  async get(url, params) {
    try {
      const { data } = await this.request.get(url, { params });
      return data;
    } catch (error) {
      return { error: error.response.data, status: error.response.status };
    }
  }

  async delete(url) {
    try {
      const { data } = await this.request.delete(url);
      return data;
    } catch (error) {
      return { error: error.response.data, status: error.response.status };
    }
  }

  async put(url) {
    try {
      const { data } = await this.request.put(url);
      return data;
    } catch (error) {
      return { error: error.response.data, status: error.response.status };
    }
  }

  async post(url, params) {
    try {
      const response = await this.request.post(url, params);
      return response;
    } catch (error) {
      return { error: error.response.data, status: error.response.status };
    }
  }

  getStatuses(params) {
    return this.get("/statuses?" + params);
  }
  postStatus(params) {
    return this.post("/statuses", params);
  }
  deleteStatus(id) {
    return this.delete("/statuses/" + id);
  }
  likeStatus(id, params) {
    return this.put("/statuses/" + id + "/like?" + params);
  }
  unlikeStatus(id, params) {
    return this.put("/statuses/" + id + "/unlike?" + params);
  }
  getUsers() {
    return this.get("/users");
  }
};
