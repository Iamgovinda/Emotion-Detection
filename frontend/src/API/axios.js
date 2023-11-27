import axios from "../config/axios";
import config from "../config";

export const get = (url) => {
  try {
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    throw error;
  }
};

export const post = (url, data) => {
  try {
    return axios.post(url, data).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export const patch = (url, data) => {
  try {
    return axios.patch(url, data).then((response) => {
      return response;
    });
  } catch (error) {
    throw error;
  }
};

export const loginPOST = (url, data) => {
  return axios.post(config.apiURL + url, data);
};

export const registerPOST = (url, data) => {
  return axios.post(config.apiURL + url, data);
};
