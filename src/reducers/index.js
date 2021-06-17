import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { userShowListReducer } from "./userShowListReducer";

const rootReducer = combineReducers({
  user: userReducer,
  showList: userShowListReducer
});

export default rootReducer;