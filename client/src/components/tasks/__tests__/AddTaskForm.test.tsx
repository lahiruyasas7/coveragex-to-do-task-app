import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTaskForm from "../AddTaskForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../../../redux/tasks/tasksSlice";
import { vi } from "vitest";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await import("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("AddTaskForm", () => {
  const store = configureStore({ reducer: { tasks: tasksReducer } });

  const renderForm = () =>
    render(
      <Provider store={store}>
        <AddTaskForm />
      </Provider>
    );

  it("renders form inputs", () => {
    renderForm();
    expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it("shows validation error if submitted empty", async () => {
    renderForm();
    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: /Add Task/i }));
    });
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
  });

  it("dispatches createTask on submit with valid data", async () => {
    renderForm();

    const input = screen.getByPlaceholderText(/What needs to be done/i);

    await act(async () => {
      await userEvent.type(input, "New Task");
      await userEvent.click(screen.getByRole("button", { name: /Add Task/i }));
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("resets the form when Clear is clicked", async () => {
    renderForm();
    const input = screen.getByPlaceholderText(/What needs to be done/i);

    await act(async () => {
      await userEvent.type(input, "Something");
      await userEvent.click(screen.getByRole("button", { name: /Clear/i }));
    });

    expect((input as HTMLInputElement).value).toBe("");
  });
});
