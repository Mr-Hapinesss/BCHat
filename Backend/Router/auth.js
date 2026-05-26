import {SignUp, SignIn, SignOut } from '../controllers/authController.js'
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', SignUp)

authRouter.post('/sign-in', SignIn)

authRouter.post('/sign-out', SignOut)

export default authRouter