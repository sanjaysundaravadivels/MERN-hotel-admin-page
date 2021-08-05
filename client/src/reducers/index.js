import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import orders from "./orders";
import menu from "./menu";
import feedback from "./feedback";
import leave from "./leave";
export default combineReducers({
  alert,
  auth,
  profile,
  orders,
  menu,
  feedback,
  leave,
});
