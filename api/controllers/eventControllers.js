import Event from "../models/Event.js";
import { createError } from "../utils/error.js";

export const createEvent = async (req, res, next) => {
	const event = req.body;
	const { user } = req;
	try {
		const createdEvent = await Event.create({ ...event, members: [user.id] });
		res.status(200).json(createdEvent);
	} catch (error) {
		next(err);
	}
};

export const addMember = async (req, res, next) => {
	const { memberId } = req.body;
	const eventId = req.params.id;

	try {
		const eventInDb = await Event.findById(eventId);

		if (eventInDb.members.includes(memberId)) {
			return next(createError(400, "Already a member"));
		}

		if (eventInDb.startTime < Date.now()) {
			return next(
				createError(403, "Meeting has been started you can not join it now")
			);
		}

		if (eventInDb.members.length >= eventInDb.maxMembers) {
			return next(
				createError(403, "No more Members can be added to this Event")
			);
		}

		eventInDb.members.push(memberId);

		const finalEvent = await eventInDb.save();

		res.status(200).json(finalEvent);
	} catch (error) {
		next(error);
	}
};

export const getEventsByOrganizer = async (req, res, next) => {
	try {
		const event = await Event.find({ organizer: req.params.id }).sort({
			startTime: 1,
		});
		res.status(200).json(event);
	} catch (err) {
		next(err);
	}
};

export const getEvent = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id).populate(
			"members",
			"name username"
		);
		res.status(200).json(event);
	} catch (err) {
		next(err);
	}
};

export const getEvents = async (req, res, next) => {
	try {
		const events = await Event.find()
			.populate("organizer", "username name _id")
			.sort({
				startTime: 1,
			});
		res.status(200).json(events);
	} catch (err) {
		next(err);
	}
};
