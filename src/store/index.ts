import {
  legacy_createStore as createStore,
  applyMiddleware,
  Dispatch,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./Reducers";

const makeStore = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default makeStore;

export type RootState = ReturnType<typeof makeStore.getState>;

export type AppDispatch = Dispatch<any>;
