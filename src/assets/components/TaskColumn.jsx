import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard"; // Import TaskCard for individual tasks

const TaskColumn = ({ title, tasks, droppableId }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {/* Droppable area for tasks */}
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-3"
          >
            {/* Render each task in the column */}
            {tasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
