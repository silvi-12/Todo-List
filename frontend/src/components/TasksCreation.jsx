import React, { useState } from "react";
import "../App.css";
import axios from "axios";

function TasksCreation() {
	const [task, setTask] = useState("");

	const handleAddTasks = () => {
		axios
			.post("http://localhost:3001/add", { task: task })
			.then((result) => location.reload())
			.catch((err) => console.log(err));
	};

	return (
		<div className="tasks-creation">
			<input
				type="text"
				name=""
				id=""
				value={task}
				onChange={(e) => {
					setTask(e.target.value);
				}}
			/>
			<button type="submit" onClick={handleAddTasks}>
				Add Task
			</button>
		</div>
	);
}

export default TasksCreation;
