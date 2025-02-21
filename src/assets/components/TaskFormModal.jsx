// TaskFormModal.jsx
import React, { useState } from 'react';

const TaskFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert('Title is required');
      return;
    }

    const task = { title, description, category };

    try {
      const response = await fetch('https://taskflow-backend-six.vercel.app/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTask = await response.json();
        onSubmit(newTask);  // Add task to UI
        onClose();  // Close modal
      } else {
        alert('Error adding task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task');
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
          <h3 className="text-2xl font-semibold mb-6 text-center">Add Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="To-Do">To-Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default TaskFormModal;
