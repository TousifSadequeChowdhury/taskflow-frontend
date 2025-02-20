import React, { useState } from "react";

const TaskModal = ({ isOpen, closeModal, addTask }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "To-Do", // Default category
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        addTask(await response.json());  // Add task to parent component
        closeModal();  // Close modal after successful submission
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  if (!isOpen) return null;  // Do not render if modal is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
              maxLength="50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              maxLength="200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Category</label>
            <select
              name="category"
              value={taskData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
