import React, { useEffect, useState } from "react";
import TasksCreation from "./TasksCreation";
import "../App.css";
import axios from "axios";
import {
	BsCircleFill,
	BsFillTrashFill,
	BsPencilSquare,
	BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
	const [todos, setTodos] = useState([]);
	const [isEditing, setIsEditing] = useState(null);
	const [editText, setEditText] = useState("");

	// Fetch tasks on component mount
	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		axios
			.get("https://todo-list-backend-5jav.onrender.com/get")
			.then((result) => setTodos(result.data))
			.catch((err) => console.log(err));
	};

	const handleDelete = (id) => {
		axios
			.delete("https://todo-list-backend-5jav.onrender.com/delete/" + id)
			.then(() => {
				setTodos(todos.filter((todo) => todo._id !== id)); // Update state to remove the task
			})
			.catch((err) => console.log(err));
	};

	const handleEditClick = (todo) => {
		setIsEditing(todo._id);
		setEditText(todo.task);
	};

	const handleInputChange = (e) => {
		setEditText(e.target.value);
	};

	const handleEditSubmit = (id) => {
		axios
			.put(`https://todo-list-backend-5jav.onrender.com/update/${id}`, {
				task: editText,
				workDone: todos.find((todo) => todo._id === id).workDone,
			})
			.then(() => {
				setTodos(
					todos.map((todo) =>
						todo._id === id ? { ...todo, task: editText } : todo
					)
				);
				setIsEditing(null);
				setEditText("");
			})
			.catch((err) => console.log(err));
	};

	const handleCheckbox = (id) => {
		const todoToUpdate = todos.find((todo) => todo._id === id);
		axios
			.put(`https://todo-list-backend-5jav.onrender.com/update/${id}`, {
				...todoToUpdate,
				workDone: !todoToUpdate.workDone,
			})
			.then(() => {
				setTodos(
					todos.map((todo) =>
						todo._id === id ? { ...todo, workDone: !todo.workDone } : todo
					)
				);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="home">
			<h2>Todo List</h2>
			{/* Pass setTodos to update the list when a new task is added */}
			<TasksCreation setTodos={setTodos} todos={todos} />
			{todos.length === 0 ? (
				<h2>No Records found</h2>
			) : (
				todos.map((todo) => (
					<div key={todo._id} className="task">
						<div
							className={`checkbox ${
								todo.workDone ? "complete" : "incomplete"
							}`}>
							<div onClick={() => handleCheckbox(todo._id)}>
								{todo.workDone ? (
									<BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
								) : (
									<BsCircleFill className="icon" />
								)}
							</div>
							<div>
								{isEditing === todo._id ? (
									<input
										type="text"
										value={editText}
										onChange={handleInputChange}
										onKeyDown={(e) =>
											e.key === "Enter" && handleEditSubmit(todo._id)
										}
									/>
								) : (
									<p
										className={
											todo.workDone ? "line_through break-words" : "break-words"
										}>
										{todo.task}
									</p>
								)}
							</div>
						</div>
						<div>
							<span>
								<BsPencilSquare
									className="icon edit-icon"
									onClick={() => handleEditClick(todo)}
								/>
							</span>
							<span>
								<BsFillTrashFill
									className="icon"
									onClick={() => handleDelete(todo._id)}
								/>
							</span>
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default Home;
