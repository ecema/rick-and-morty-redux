import characterSaga from "./character/characterSaga";
import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(characterSaga)]);
}
