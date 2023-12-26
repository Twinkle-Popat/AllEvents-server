import jwt from 'jsonwebtoken';
import Event from '../models/Events.js';
import e from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';


export const addevent = async (req,res,next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(401).json({message:"Unauthorized"});
    }

    let userId;
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(401).json({message:"Unauthorized"});
        }
        else{
            userId = decrypted.id;
            console.log(userId);
            return;
        }
        
    });

    const { eventname, startdate, enddate, location, description, category, image} = req.body;
    if(!eventname && eventname.trim()==="" && !startdate && startdate.trim()==="" && !enddate && enddate.trim()==="" && !location && location.trim()==="" && !description && description.trim()==="" && !category && category.trim()==="" && !image && image.trim()===""){
        return res.status(422).json({message:"Invalid inputs"});
    }

    let event;
    try{
        event = new Event(
            {eventname, startdate:new Date(`${startdate}`), enddate:new Date(`${enddate}`), location, description, category, image,creator:userId});
            const session = await mongoose.startSession();
            const user = await User.findById(userId);
            session.startTransaction();
            await event.save({session:session});
            user.addedEvents.push(event);
            await user.save({session:session});
            await session.commitTransaction();
            
        console.log(event.creator)
    }
    catch(err){
        return console.log(err);
    }

    if(!event){
        return res.status(500).json({message:"Could not add event"});
    }

    res.status(201).json({event});
}

export const getEvents = async (req,res,next) => {
    let events;
    try{
        events = await Event.find();
    }
    catch(err){
        return console.log(err);
    }

    if(!events){
        return res.status(404).json({message:"Could not find events"});
    }

    res.json(events);
}

export const getEventById = async (req,res,next) => {
    const id = req.params.id;
    let event;
    try{
        event = await Event.findById(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!event){
        return res.status(404).json({message:"Could not find event"});
    }

    res.json(event);
}