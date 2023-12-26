import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
         required:true,
         minlength:6
     },

    addedEvents:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Event'
        }
    ]
    
    
});

export default mongoose.model('User',userSchema);