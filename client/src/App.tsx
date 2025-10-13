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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Organize your tasks with style
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left side - Add Task Form */}
          <div className="lg:w-2/5 xl:w-1/3">
            <AddTaskForm />
          </div>

          {/* Right side - Tasks List */}
          <div className="lg:w-3/5 xl:w-2/3">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Your Tasks
                </h2>
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tasksList?.length || 0} tasks
                </span>
              </div>

              {tasksList && tasksList.length > 0 ? (
                <div className="space-y-4">
                  {tasksList.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                    No tasks yet
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Add your first task from the left side
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
