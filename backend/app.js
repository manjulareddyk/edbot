import express from "express";
import User from "./routers/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use("/api/v1", User);
app.get("/", (req, res) => {
    res.send("Server is running");
});