import Request from "../models/Requests.js";
import Event from "../models/Event.js";
import { createError } from "../utils/error.js";
import User from "../models/User.js";

// This is handler uses verifyToken
export const requestJoinEvent = async (req, res, next) => {
	const eventId = req.params.eventId;

	if (!req.user) return next(createError(403, "You are not Authenticated"));

	console.log(req.user);

	try {
		const event = await Event.findById(eventId);
		const userId = req.user.id;
		let requestDb = await Request.findOne({
			creator: userId,
			event: eventId,
		});

		if (requestDb && event.startTime < Date.now()) {
			requestDb.expired = true;
			requestDb = await requestDb.save();
		}

		if (requestDb) {
			return res.status(200).send({ request: requestDb });
		}

		if (event.startTime < Date.now()) {
			return next(
				createError(
					403,
					"Event has Started and now You can not enter the Event"
				)
			);
		}

		console.log(userId);

		const request = await Request.create({
			creator: userId,
			event: eventId,
		});

		res.status(200).json({
			msg: "Request sent successfully for joining of Event",
			request,
			new: true,
		});
	} catch (error) {
		next(error);
	}
};

export const checkForRequest = async (req, res, next) => {
	const eventId = req.params.eventId;
	if (!req.user) return next(createError(403, "You are not Authenticated"));

	try {
		const event = await Event.findById(eventId);
		const userId = req.user.id;
		let requestDb = await Request.findOne({
			creator: userId,
			event: eventId,
		});

		if (!requestDb) return next(createError(404, "Not yet Requested"));

		if (event.startTime < Date.now()) {
			requestDb.expired = true;
			requestDb = await requestDb.save();
		}

		return res.status(200).send({ request: requestDb });
	} catch (error) {
		next(error);
	}
};

export const getRequestsByEventId = async (req, res, next) => {
	const eventId = req.params.eventId;

	if (!req.user) return next(createError(403, "You are not Authenticated"));

	try {
		const reqs = await Request.find({ event: eventId }).populate(
			"creator",
			"_id name username"
		);
		res.status(200).json({ requests: reqs });
	} catch (error) {
		next(error);
	}
};

export const getRequests = async (req, res, next) => {
	if (!req.user) return next(createError(403, "You are not Authenticated"));
	const { _id: creator } = req.user;

	try {
		const requests = await Request.find({ creator });
		res.status(200).json({ requests });
	} catch (error) {
		next(error);
	}
};

export const acceptRequest = async (req, res, next) => {
	const { _id, event: eventId } = req.body.request;

	try {
		const request = await Request.findById(_id);
		const event = await Event.findById(eventId);
		const user = await User.findById(request.creator);

		if (event.startTime < Date.now()) {
			return res.status(401).json({ msg: "Event Started so cannot join" });
		}

		if (event.members.includes(request.creator)) {
			return next(createError(400, "Already a member"));
		}

		if (event.members.length >= event.maxMembers) {
			return next(
				createError(403, "No more Members can be added to this Event")
			);
		}

		event.members.push(request.creator);
		const finalEvent = await event.save();

		request.accepted = true;

		const finalRequest = request.save();

		return res.status(200).json({ request: finalRequest });
	} catch (error) {
		next(error);
	}
};

export const rejectRequest = async (req, res, next) => {
	const { _id, event: eventId } = req.body.request;

	try {
		const request = await Request.findById(_id);
		const event = await Event.findById(eventId);

		if (event.startTime < Date.now()) {
			request.expired = true;
		}

		request.rejected = true;

		const finalReq = await request.save();

		return res.status(200).json({ request: finalReq });
	} catch (error) {
		next(error);
	}
};

export const deleteReq = async (req, res, next) => {
	const { id } = req.params;

	try {
		const ans = await Request.findByIdAndDelete(id);
		res.status(200).json({ ans });
	} catch (error) {
		next(error);
	}
};
