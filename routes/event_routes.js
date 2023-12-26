import express from "express";
const eventRouter = express.Router();
import { addevent,getEvents,getEventById  } from "../controllers/event_controller.js";

eventRouter.post("/", addevent);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById );

export default eventRouter;