import { createSlice } from "@reduxjs/toolkit";
import type { TaskFormInputs } from "../../types/common";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasksList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasksList: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask: (state, _action: PayloadAction<TaskFormInputs>) => {
      state.loading = true;
      state.error = null;
    },

    getRecentTasks: (state) => {
      state.loading = true;
      state.error = null;
    },

    getTasksSuccess: (state, action: PayloadAction<any[]>) => {
      state.tasksList = action.payload;
      state.loading = false;
    },

    getTasksFail: (state, action: PayloadAction<string | undefined>) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch tasks";
      state.tasksList = [];
    },

    markAsDone: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
  },
});

export const { createTask, getRecentTasks, getTasksSuccess, getTasksFail, markAsDone } =
  taskSlice.actions;

export default taskSlice.reducer;
