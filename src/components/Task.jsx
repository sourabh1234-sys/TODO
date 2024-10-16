// src/components/Task.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase"; // Corrected import path
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import '../index.css';

const Task = ({ listId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const taskRef = db.collection("users").doc(user.uid).collection("todoLists").doc(listId).collection("tasks");
        const snapshot = await taskRef.get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(data);
      }
    };
    fetchData();
  }, [listId]);

  const addTask = async () => {
    const user = auth.currentUser;
    if (user && taskTitle && taskDescription && taskDueDate && taskPriority) {
      await db.collection("users").doc(user.uid).collection("todoLists").doc(listId).collection("tasks").add({
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        priority: taskPriority,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate("");
      setTaskPriority("");
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 1);

    setTasks(items);
    // Update task priority in Firebase or any other necessary updates
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <h3 className="text-2xl mb-4">Tasks</h3>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-3 border rounded-md mb-2 bg-gray-200 text-black"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
        />
        <input
          type="text"
          className="w-full p-3 border rounded-md mb-2 bg-gray-200 text-black"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task Description"
        />
        <input
          type="date"
          className="w-full p-3 border rounded-md mb-2 bg-gray-200 text-black"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
        />
        <select
          className="w-full p-3 border rounded-md mb-2 bg-gray-200 text-black"
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={addTask}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Add Task
        </button>
      </div>

      <Droppable droppableId="tasks">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-800 text-white p-4 mb-3 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    <h4 className="text-lg mb-2">{task.title}</h4>
                    <p className="mb-1">{task.description}</p>
                    <p className="mb-1">Due: {task.dueDate}</p>
                    <p className="mb-1">Priority: {task.priority}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Task;
