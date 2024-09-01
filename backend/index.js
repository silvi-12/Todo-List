const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
	"mongodb+srv://ravidemo3:Ravi2024@todo.xvgmu.mongodb.net/?retryWrites=true&w=majority&appName=Todo"
);

app.get("/get", (req, res) => {
	TodoModel.find()
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
});

//delete
app.delete("/delete/:id", (req, res) => {
	const { id } = req.params;
	TodoModel.findByIdAndDelete({ _id: id })
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
});

// edit
app.put("/update/:id", (req, res) => {
	const { id } = req.params;
	const { task, workDone } = req.body;
	TodoModel.findByIdAndUpdate({ _id: id }, { task, workDone }, { new: true })
		.then((result) => res.json(result))
		.catch((err) => res.json(err));
});

// create
app.post("/add", (req, res) => {
	const task = req.body.task;
	if (!task) {
		return res.status(400).json({ error: "Task is required" });
	}

	TodoModel.create({ task: task })
		.then((result) => {
			console.log("Task added:", result);
			res.json(result);
		})
		.catch((err) => {
			console.error("Error adding task:", err);
			res.status(500).json({ error: "Failed to add task" });
		});
});

app.listen(3001, () => {
	console.log("server is running");
});
