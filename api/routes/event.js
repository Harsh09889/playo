import express from "express";
import {
	addMember,
	createEvent,
	getEvent,
	getEvents,
	getEventsByOrganizer,
} from "../controllers/eventControllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createEvent);

//UPDATE
router.patch("/:id", verifyToken, addMember);

//DELETE
// router.delete("/:id", verifyToken, deleteUser);

//GET
router.get("/:id", getEvent);
router.get("/organizer/:id", getEventsByOrganizer);

//GETALL
router.get("/", getEvents);

export default router;
