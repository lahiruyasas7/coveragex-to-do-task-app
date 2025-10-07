import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../redux/tasks/tasksSlice";

const store = configureStore({ reducer: { tasks: tasksReducer } });

describe("App", () => {
  it("renders main header", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByRole("heading", { name: /Task Manager/i })).toBeInTheDocument();
  });

  it("renders AddTaskForm and Your Tasks section", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check AddTaskForm heading
    expect(screen.getByRole("heading", { name: /Add New Task/i })).toBeInTheDocument();

    // Check Tasks heading
    expect(screen.getByRole("heading", { name: /Your Tasks/i })).toBeInTheDocument();
  });
});
