import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import express from 'express';
import router from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';



export const SignUp = async(req, res, next) => {
    try {
        // create an Atomic session
        const session = await mongoose.startSession();
        session.startTransaction();

        // fetch data from request body
        const {name, email, password} = req.body;

        // check if user exists
        const userExist = await User.findOne({email});
        if(userExist) {
            const error = new Error ('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // hash user's password
        const salt = await bcrypt.genSalt(10);
        const hashesPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create([{ name, email, password: hashesPassword }], {session});
        // assign a token to user
        const token = jwt.sign({userId: newUser[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});

        // end atomic session
        await session.commitTransaction();
        session.endSession();

        // send a json response to client
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0],
                email: newUser[1]
            }
        })

    } catch (error) { // error handling

        next(error);
    }
}

export const SignIn = async (req, res, next) => {
    try {

        // fetch user from request body
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        //compare passwords if user exists
        const validPassort = await bcrypt.compare(password, user.password);
        if(!validPassort) {
            const error = new Eror ('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        // if everything okay, asign a token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY});

        // set the token in an HTTP cookie
        res.cookie('token', token, 
            {httpOnly: true, secure: false, samesite: 'lax', path: '/'}, 
            (err, token) => {
                if(err) {
                    console.error('Error setting cookie', err);
                }
            })
            .json({
                success: true,
                message: 'User logged in successfully',
                data: {
                    token,
                    user: user.name,
                    email: user.email
                }
            })

    } catch (error) {
        next(error);
    }
}

export const SignOut = async (req, res, next) => {
    try {
        // clear the cookie
        res.clearCookie('token', {path: '/'});

        res.status(200).json({
            success: true,
            message: 'User signed out successfully'
        });
    } catch (error) {
        next(error);
    }
}