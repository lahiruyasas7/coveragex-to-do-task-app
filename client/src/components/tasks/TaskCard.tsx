// src/components/tasks/TaskCard.tsx
import React from "react";
import type { Task } from "../../types/common";
import { useDispatch, useSelector } from "react-redux";
import { markAsDone } from "../../redux/tasks/tasksSlice";
import Button from "../Button";
import type { RootState } from "../../redux/store";

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

      <Button variant="success" onClick={markAsDoneHandler} loading={loading}>
        Done
      </Button>
    </div>
  );
};

export default TaskCard;
