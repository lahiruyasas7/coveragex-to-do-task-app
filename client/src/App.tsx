import { useEffect } from "react";
import "./App.css";
import AddTaskForm from "./components/tasks/AddTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { getRecentTasks } from "./redux/tasks/tasksSlice";
import type { RootState } from "./redux/store";
import TaskCard from "./components/tasks/TaskCard";

function App() {
  const { tasksList } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecentTasks());
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 p-4 gap-4">
      {/* Left side - Add Task Form */}
      <div className="md:w-1/2">
        <AddTaskForm />
      </div>

      {/* Right side - placeholder for tasks list */}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Tasks List
        </h2>

        {tasksList && tasksList.length > 0 ? (
          <div className="space-y-4">
            {tasksList.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No tasks yet. Add one from the left side ➕
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
