import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([
    //tasksSaga(), // add other sagas here if needed
  ]);
}
