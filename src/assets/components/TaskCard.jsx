import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-3 rounded-lg shadow-md"
        >
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
