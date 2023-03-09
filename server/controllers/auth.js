import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try{

        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({firstName: firstName, lastName: lastName, email, password: hashedPassword });
        await user.save();
        res.status(201).send();
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }

};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
           return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token });


    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};
