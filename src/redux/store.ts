import { rootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const store = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
    devTools: false,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppState = ReturnType<typeof rootReducer>;
export default store;