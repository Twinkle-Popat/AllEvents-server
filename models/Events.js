import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventname:{
        type:String,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
        
    },
    image:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
        
    }
    
})

export default mongoose.model('Event',eventSchema);