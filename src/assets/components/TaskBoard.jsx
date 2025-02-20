import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskModal from "./TaskModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/tasks");
        const data = await response.json();
        setTasks({
          todo: data.filter(task => task.category === "To-Do"),
          inProgress: data.filter(task => task.category === "In Progress"),
          done: data.filter(task => task.category === "Done"),
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];

    const movedTask = sourceColumn[source.index];
    sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });

    fetch(`http://localhost:5000/tasks/${movedTask._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: destination.droppableId }),
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTask.category.toLowerCase()]: [...prevTasks[newTask.category.toLowerCase()], newTask],
    }));
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <button
        onClick={openModal}
        className="mb-4 bg-green-500 text-white py-2 px-6 rounded-md"
      >
        Add Task
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
          <TaskColumn title="To-Do" tasks={tasks.todo} droppableId="todo" />
          <TaskColumn title="In Progress" tasks={tasks.inProgress} droppableId="inProgress" />
          <TaskColumn title="Done" tasks={tasks.done} droppableId="done" />
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      <TaskModal isOpen={isModalOpen} closeModal={closeModal} addTask={addTask} />
    </div>
  );
};

export default TaskBoard;
