/**
 * Axios config  setup
 * Set interceptor for global api response error handling
 * Set access token in headers
 */
import axios from "axios";
import store from "../store";

export const axiosInterceptor = () => {
  axios.interceptors.request.use(null, (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return Promise.reject(error);
      } else return Promise.reject(error);
    } else if (error.request) {
      let err = {
        response: {
          data: {
            message: "Something went wrong,Please try again later!!!",
          },
        },
      };
      return Promise.reject(err);
    }
  });

  axios.interceptors.response.use(null, (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        return Promise.reject(error);
      } else return Promise.reject(error);
    } else if (error.request) {
      let err = {
        response: {
          data: {
            message: "Something went wrong,Please try again later!!!",
          },
        },
      };
      return Promise.reject(err);
    }
  });
};
