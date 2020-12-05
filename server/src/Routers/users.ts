import express, { Request, Response } from 'express';
import { userModel } from '../DB/models/user';
export const UserRouter = express.Router();

UserRouter.get('/users', async (req: Request, res: Response<{}>) => {
	const users = await userModel.find({});
	res.send(users);
});

UserRouter.get('/user/login', (req: Request, res: Response<string>) => {
	res.send('Login');
});

UserRouter.get('/user/logout', (req: Request, res: Response<string>) => {
	res.send('LogOut');
});

UserRouter.post('/user/signup', async (req: Request, res: Response<{}>) => {
	const { name, usn } = req.body;
	const user = new userModel({ name, usn });
	await user.save();
	res.send(user);
});

UserRouter.get('/user/forgotpassword', (req: Request, res: Response<string>) => {
	res.send('ForgotPassword');
});
