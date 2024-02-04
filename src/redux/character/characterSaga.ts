import { PayloadAction } from "@reduxjs/toolkit";
import { getCharacterList } from "./characterService";
import {
  getCharacterListFailure,
  getCharacterListStart,
  getCharacterListSuccess,
} from "./characterSlice";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

function* getCharacterListData(action: PayloadAction<{ name?: string }>) {
  try {
    const { data } = yield call(getCharacterList, action?.payload?.name);
    yield put(getCharacterListSuccess(data));
  } catch (error: any) {
    yield put(getCharacterListFailure(error));
  }
}

function* watchGetCharacterList() {
  yield takeLatest(getCharacterListStart, getCharacterListData);
}

export default function* characterSaga() {
  yield all([fork(watchGetCharacterList)]);
}
