import express, { Request, Response } from 'express';
export const UserRouter = express.Router();

UserRouter.get('/user/login', (req: Request, res: Response<string>) => {
	res.send('Login');
});

UserRouter.get('/user/logout', (req: Request, res: Response<string>) => {
	res.send('LogOut');
});

UserRouter.post('/user/signup', (req: Request, res: Response<{}>) => {
	res.send('Sign Up');
});

UserRouter.get('/user/forgotpassword', (req: Request, res: Response<string>) => {
	res.send('ForgotPassword');
});
