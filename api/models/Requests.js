import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
	{
		creator: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		event: {
			type: mongoose.Types.ObjectId,
			ref: "Event",
			required: true,
		},
		expired: {
			type: Boolean,
			default: false,
		},
		accepted: {
			type: Boolean,
			default: false,
		},
		rejected: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Request", RequestSchema);
