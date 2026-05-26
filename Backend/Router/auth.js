import {SignUp, SignIn, SignOut } from '../controllers/authController.js'
import { Router } from 'express';

const authRouter = Router();

authRouter.put('/sign-up', SignUp)

authRouter.put('/sign-up', SignIn)

authRouter.put('/sign-up', SignOut)

export default authRouter