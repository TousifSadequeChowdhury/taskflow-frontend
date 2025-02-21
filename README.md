TaskFlow

A modern, responsive task management application built using React, Firebase Authentication, Express.js, and MongoDB. This app allows users to manage their tasks with features like adding, editing, deleting, reordering tasks, and real-time synchronization.

Live Demo
https://charming-zuccutto-5ce262.netlify.app/

Features
Authentication: Users can sign in via Google using Firebase Authentication. The app is accessible only to authenticated users.
Task Management: Users can create, edit, delete, and reorder tasks in three categories: To-Do, In Progress, and Done.
Real-Time Sync: Tasks are automatically saved and updated in the database, and changes are reflected in real-time.
Drag-and-Drop: Tasks can be reordered and moved between categories using a smooth drag-and-drop interface.
Responsive UI: The app works seamlessly on both desktop and mobile devices.
Database: Tasks are stored in MongoDB, and changes are instantly reflected in the database.
Technologies Used
Frontend: React, Vite.js, react-beautiful-dnd (for drag-and-drop functionality)
Backend: Express.js, MongoDB, Firebase Authentication
Real-Time Sync: MongoDB Change Streams 