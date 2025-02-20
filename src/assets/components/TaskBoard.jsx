import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    // Fetch tasks from backend API
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

  // Handle Drag & Drop
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

    // Update backend
    fetch(`http://localhost:5000/tasks/${movedTask._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: destination.droppableId }),
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center mt-5">
        <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
          <TaskColumn title="To-Do" tasks={tasks.todo} droppableId="todo" />
          <TaskColumn title="In Progress" tasks={tasks.inProgress} droppableId="inProgress" />
          <TaskColumn title="Done" tasks={tasks.done} droppableId="done" />
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
