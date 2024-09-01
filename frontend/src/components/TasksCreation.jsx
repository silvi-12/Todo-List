import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function TasksCreation({ setTodos, todos }) {
	const [task, setTask] = useState("");

	const handleAddTasks = () => {
		if (!task.trim()) return; // Prevent adding empty tasks
		axios
			.post("https://todo-list-backend-5jav.onrender.com/add", { task: task })
			.then((result) => {
				setTodos([...todos, result.data]); // Add the new task to the current state
				setTask(""); // Clear the input field after adding
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="tasks-creation">
			<input
				type="text"
				placeholder="Add a new task"
				value={task}
				onChange={(e) => setTask(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleAddTasks()} // Add task on Enter key
			/>
			<button type="submit" onClick={handleAddTasks}>
				Add Task
			</button>
		</div>
	);
}

export default TasksCreation;
