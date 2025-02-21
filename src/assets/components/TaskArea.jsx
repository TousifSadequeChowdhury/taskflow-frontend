import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskArea = ({ tasks, setTasks }) => {
  const handleDelete = async (taskId) => {
    try {
      // Sending DELETE request to the backend
      await axios.delete(`https://taskflow-backend-six.vercel.app/tasks/${taskId}`);
      // Removing the deleted task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskArea;
