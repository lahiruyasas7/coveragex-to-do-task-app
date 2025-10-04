import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TaskFormInputs } from "../../types/common";
import { useDispatch } from "react-redux";
import { createTask } from "../../redux/tasks/tasksSlice";

// --- Yup validation schema ---
const taskSchema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title too short"),
});

const AddTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(taskSchema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log("Form Data:", data);
    if (data) {
      dispatch(createTask(data));
    }
    reset(); // Reset form after submit
  };

  return (
    <div className="flex flex-col items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Add Task
      </h2>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter task title"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter task description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description")}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
