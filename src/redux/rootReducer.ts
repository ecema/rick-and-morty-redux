import characterSlice from "./character/characterSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  characterState: characterSlice,
});
