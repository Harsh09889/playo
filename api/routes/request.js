import express from "express";
import {
	requestJoinEvent,
	getRequestsByEventId,
	getRequests,
	checkForRequest,
	acceptRequest,
	rejectRequest,
	deleteReq,
} from "../controllers/requestControllers.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/join/:eventId", verifyToken, requestJoinEvent);
router.get("/event/:eventId", verifyToken, getRequestsByEventId);
router.get("/", getRequests);
router.get("/checkRequest/:eventId", verifyToken, checkForRequest);
router.patch("/accept", verifyToken, acceptRequest);
router.patch("/reject", verifyToken, rejectRequest);
router.delete("/delete/:id", verifyToken, deleteReq);

export default router;
