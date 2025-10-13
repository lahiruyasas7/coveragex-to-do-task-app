import React from "react";
import type { Task } from "../../types/common";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { markAsDone } from "../../redux/tasks/tasksSlice";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { loading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const markAsDoneHandler = () => {
    if (task) {
      console.log("Marking as done:", task.id);
      dispatch(markAsDone(task.id));
    }
  };
  const getRandomGradient = () => {
    const gradients = [
      "from-purple-500/10 to-blue-500/10 border-l-purple-500",
      "from-emerald-500/10 to-cyan-500/10 border-l-emerald-500",
      "from-amber-500/10 to-orange-500/10 border-l-amber-500",
      "from-rose-500/10 to-pink-500/10 border-l-rose-500",
      "from-indigo-500/10 to-purple-500/10 border-l-indigo-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div
      className={`bg-gradient-to-r ${getRandomGradient()} rounded-xl border-l-4 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
              {task.title}
            </h3>
            <span className="bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Created{" "}
                {new Date(task.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={markAsDoneHandler}
                loading={loading}
                className="!px-3 !py-1 text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
