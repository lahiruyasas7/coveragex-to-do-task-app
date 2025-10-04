import { put, takeLatest } from "redux-saga/effects";
import type { TaskFormInputs } from "../../types/common";
import { API } from "../../util/axios";
import {
  createTask,
  getRecentTasks,
  getTasksSuccess,
  getTasksFail,
  markAsDone,
} from "./tasksSlice";

export function* createTaskSaga(action: {
  type: string;
  payload: TaskFormInputs;
}): Generator<any, void, any> {
  try {
    const response = yield API.post(`tasks/create`, action.payload);

    if (response.status === 201) {
      //toast.success("Sub Category added successfully");
      yield put(getRecentTasks());
    }
  } catch (e: any) {
    let message = "Cannot add Task";
    if (e?.response?.data?.message) {
      message = `${message}: ${e.response.data.message}`;
    } else if (e?.response?.data?.error) {
      message = `${message}: ${e.response.data.error}`;
    }
    //toast.error(message);
    console.error(e);
  }
}

export function* getRecentTasksSaga() {
  try {
    const { data } = yield API.get(`tasks`);

    yield put(getTasksSuccess(data));
  } catch (e: any) {
    // toast.error(
    //   e.response?.data?.message || "Error in retrieving Main Category data"
    // );
    yield put(getTasksFail(e.response?.data?.message || e.message));
  }
}

export function* markAsDoneSaga(action: {
  type: string;
  payload: string;
}): Generator<any, void, any> {
  try {
    const taskId = action.payload;
    const response = yield API.patch(`tasks/${taskId}/complete`);
    if (response.status === 200) {
      yield put(getRecentTasks());
      //toast.success("Task Mark as done successfully");
    }
  } catch (e) {
    //toast.error(e.response?.data?.message || "Error in updating Category");
  }
}

function* watchTaskSaga() {
  yield takeLatest(createTask.type, createTaskSaga);
  yield takeLatest(getRecentTasks.type, getRecentTasksSaga);
  yield takeLatest(markAsDone.type, markAsDoneSaga);
}

const taskSaga = [watchTaskSaga];

export default taskSaga;
