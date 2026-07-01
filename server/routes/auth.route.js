import express from "express";
import { googleAuth, logOut } from "../controllers/auth.controller.js";

const Authrouter=express.Router();

Authrouter.post("/google",googleAuth);
Authrouter.get("/logout",logOut);

export default Authrouter;