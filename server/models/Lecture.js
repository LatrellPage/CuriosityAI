const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	conversation: {
		messages: [
			{
				text: {
					type: String,
					required: true,
				},
				sender: {
					type: String,
					enum: ["user", "ai"],
					required: true,
				},
				timestamp: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Lecture = mongoose.model("Lecture", lectureSchema);

module.exports = Lecture;
