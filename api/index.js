import express from "express";
import authRoute from "./routes/auth.js";
import eventRouter from "./routes/event.js";
import cookieParser from "cookie-parser";
import connect from "./db/connection.js";
import cors from "cors";
import { PORT } from "./config/config.js";
import requestRouter from "./routes/request.js";
const app = express();

//middlewares
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/events", eventRouter);
app.use("/api/request", requestRouter);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something Went Wrong!!";
	return res.status(errorStatus, errorMessage).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
});

const port = PORT || 8080;

app.listen(port, async () => {
	console.log("Connected to Express at", port);
	await connect();
});
