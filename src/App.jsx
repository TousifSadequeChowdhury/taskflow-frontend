import React from "react";
import TaskBoard from "./assets/components/TaskBoard";
import Navbar from "./assets/components/Navbar";

const App = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <TaskBoard />
    </div>
  );
};

export default App;
