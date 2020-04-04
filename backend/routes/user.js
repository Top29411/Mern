import express from 'express';
import { login, signUp } from '../controllers/userController';
let userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);

export default userRouter;
