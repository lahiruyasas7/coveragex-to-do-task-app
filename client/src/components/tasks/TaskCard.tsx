// src/components/tasks/TaskCard.tsx
import React from "react";
import type { Task } from "../../types/common";
import { useDispatch } from "react-redux";
import { markAsDone } from "../../redux/tasks/tasksSlice";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const markAsDoneHandler = () => {
    if (task) {
      console.log("Marking as done:", task.id);
      dispatch(markAsDone(task.id));
    }
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-700 shadow-sm rounded-xl p-4 flex items-start justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {task.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.description || "No description provided."}
        </p>
      </div>

      <button
        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        onClick={markAsDoneHandler}
      >
        Done
      </button>
    </div>
  );
};

export default TaskCard;
