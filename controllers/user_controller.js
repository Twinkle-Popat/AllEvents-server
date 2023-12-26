import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: 'Could not find users' });
    }

    return res.json(users);
}

export const signup = async (req, res,next) => {
    const { name, email, password } = req.body;

    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid inputs"});
    }

const hashedPassword = await bcrypt.hash(password, 12);
     let user;
    try {
        user = new User({
            name,
            email,
            password: hashedPassword
        });
        user = await user.save();
    } catch (err) {
        return console.log(err);
    }

    if (!user) {
        return res.status(500).json({ message: 'Could not create user' });
    }

    return res.status(201).json({id:user._id,message:"User created successfully"});
}


export const updateUser = async (req, res,next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;

    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid inputs"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{
            name,
            email,
            password: hashedPassword
        });
       
    } catch (err) {
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Could not update user"});
    }

    res.status(200).json({message:"User updated successfully"});
}


export const deleteUser = async (req, res,next) => {
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"Could not delete user"});
    }
    res.status(200).json({message:"User deleted successfully"});
}

export const login = async (req, res,next) => {
    const { email, password } = req.body;

    if(!email && email.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid inputs"});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let user;
    try{
        user = await User.findOne({email});
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"User not found"});
    }

    
    const isValidPassword = bcrypt.compare(user.password,hashedPassword);
    
console.log(isValidPassword)
    if(!isValidPassword){
        

        return res.status(401).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({id:user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"7d"});

    res.status(200).json({message:"Logged in successfully",token,id:user._id});
}