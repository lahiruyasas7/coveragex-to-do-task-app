import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../../../redux/tasks/tasksSlice";
import { vi } from "vitest";

// Mock dispatch
const mockDispatch = vi.fn();
vi.mock("react-redux", async (orig) => {
  const actual = await orig();
  return {
    ...(typeof actual === "object" && actual !== null ? actual : {}),
    useDispatch: () => mockDispatch,
  };
});

// Mock task data
const mockTask = {
  id: "1",
  title: "Test Task",
  description: "This is a test task",
  createdAt: new Date().toISOString(),
  isCompleted: false,
  updatedAt: new Date().toISOString(),
};

describe("TaskCard", () => {
  const store = configureStore({ reducer: { tasks: tasksReducer } });

  const renderCard = () =>
    render(
      <Provider store={store}>
        <TaskCard task={mockTask} />
      </Provider>
    );

  it("renders task title and description correctly", () => {
    renderCard();

    // Query the heading by role and level to avoid multiple matches
    const title = screen.getByRole("heading", { name: /Test Task/i, level: 3 });
    expect(title).toBeInTheDocument();

    // Query description by exact text
    const description = screen.getByText("This is a test task");
    expect(description).toBeInTheDocument();
  });

  it("dispatches markAsDone when Done button is clicked", () => {
    renderCard();

    const doneButton = screen.getByRole("button", { name: /Done/i });
    fireEvent.click(doneButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("shows the created date correctly", () => {
    renderCard();

    const dateText = new Date(mockTask.createdAt).toLocaleDateString();
    expect(screen.getByText(new RegExp(`Created\\s+${dateText}`))).toBeInTheDocument();
  });
});
