import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TaskFormInputs } from "../../types/common";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/tasks/tasksSlice";
import type { RootState } from "../../redux/store";
import Button from "../Button";

const taskSchema = yup.object({
  title: yup.string().required("Title is required").min(3, "Title too short"),
});

const AddTaskForm: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.tasks);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(taskSchema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    console.log("Form Data:", data);
    if (data) {
      dispatch(createTask(data));
    }
    reset();
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 md:p-8 w-full">
      {/* Header with icon */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Add New Task
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Create and organize your tasks
          </p>
        </div>
      </div>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            placeholder="What needs to be done?"
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-200 ${
              errors.title
                ? "border-rose-500 focus:ring-rose-500/20 focus:border-rose-500"
                : "border-gray-200 dark:border-gray-600 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700/50 dark:text-white"
            }`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-rose-500 text-sm mt-2 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-8">
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Add some details about your task..."
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 dark:bg-gray-700/50 dark:text-white resize-none"
            {...register("description")}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="gradient"
            loading={loading}
            className="flex-1 justify-center"
          >
            {loading ? "Adding..." : "Add Task"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => reset()}
            disabled={!isDirty}
            className="flex-1 justify-center"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
