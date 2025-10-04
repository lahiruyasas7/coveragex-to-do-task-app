import { all, fork } from "redux-saga/effects";
import taskSaga from "./tasks/taskSaga";

export default function* rootSaga() {
  yield all(taskSaga.map((s) => fork(s)));
}
