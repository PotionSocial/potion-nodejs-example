var https = require("https");
var axios = require("axios");
var env = require("./../config");

module.exports = class HttpService {
  constructor() {
    this.request = axios.create(this.setConfig());
  }

  setConfig() {
    const defaultConfig = {
      baseURL: env.POTION_API_URL + "/public-api/v1",
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
};
