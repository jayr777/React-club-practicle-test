import { combineReducers } from "redux";
import productReducer from "./Product/Reducer";

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;

