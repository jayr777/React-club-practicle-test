import * as ACTION_TYPES from "./Types";

const initialState = {
  message: "",
  error: null,
  productList: [],
  mainProductList:[],
  product: {},
  start: 0,
  length: 12,
  flagCount: false,
  isEdited: false,
};

const productReducer = (
  state = initialState,
  action: { type: any; payload: { data: { message: any }; message: any } }
) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload.data,
        mainProductList: action.payload.data,
        message: action.payload.message,
        error: null,
      };

    case ACTION_TYPES.SEARCH_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_LIST_ERROR:
    case ACTION_TYPES.SEARCH_ERROR:
      return {
        ...state,
        message: action.payload.data.message,
        error: action.payload.data.message,
        isEdited: false,
      };

    default:
      return state;
  }
};

export default productReducer;
