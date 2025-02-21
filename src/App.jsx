import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
// Import your Navbar component here
import Navbar from '../src/assets/components/Navbar'; // Adjust the path if necessary

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'To-Do',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://taskflow-backend-six.vercel.app/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  // Handle Add Task input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskflow-backend-six.vercel.app/tasks', newTask);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask({ title: '', description: '', category: 'To-Do' });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Handle Delete Task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://taskflow-backend-six.vercel.app/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle Drag and Drop
  const handleDragEnd = async (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const [removedTask] = updatedTasks.splice(source.index, 1);
    removedTask.category = destination.droppableId;

    updatedTasks.splice(destination.index, 0, removedTask);

    try {
      await axios.put(`https://taskflow-backend-six.vercel.app/tasks/${removedTask._id}`, {
        category: removedTask.category,
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task category:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Navbar Component */}
      <Navbar />

      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
      >
        Add Task
      </button>

      {/* Modal for Adding Task */}
      {isModalOpen && (
        <div className="modal bg-gray-500 bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="border p-2 rounded-lg w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Category</label>
                <select
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className="border p-2 rounded-lg w-full"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Drag and Drop Task Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-6">
          {['To-Do', 'In Progress', 'Done'].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-4 rounded-lg shadow"
                          >
                            <h4 className="font-semibold">{task.title}</h4>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">{task.category}</p>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
