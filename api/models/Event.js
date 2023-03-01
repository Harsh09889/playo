import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		organizer: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		maxMembers: {
			type: Number,
			required: true,
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Event", EventSchema);
