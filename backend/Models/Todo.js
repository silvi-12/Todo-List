const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
	task: String,
	workDone: {
		type: Boolean,
		default: false,
	},
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = TodoModel;
