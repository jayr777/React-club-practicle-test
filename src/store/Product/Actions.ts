import axios from "axios";
import * as ACTION_TYPES from "./Types";
import { API_PRODUCTLIST, TOKEN } from "../../constants/Api";
import { AppDispatch } from "../index";

//To retrieve product list
export const getProductList = () => (dispatch: AppDispatch) => {
  return axios
    .get(API_PRODUCTLIST, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    .then((res) => {
      dispatch({ type: ACTION_TYPES.FETCH_LIST_SUCCESS, payload: res });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: ACTION_TYPES.FETCH_LIST_ERROR,
        payload: err,
      });
      throw err;
    });
};
