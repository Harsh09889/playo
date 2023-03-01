import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO;
export const PORT = process.env.PORT;
