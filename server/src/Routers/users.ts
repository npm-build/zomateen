import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { db } from '../DB/db';
import { userModel } from '../DB/models/user';
export const UserRouter = express.Router();
dotenv.config();

UserRouter.get('/users', async (req: Request, res: Response<{}>) => {
	const users = await userModel.find({});
	res.send(users);
});

UserRouter.get('/dropDB', async (req: Request, res: Response<{}>) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

UserRouter.post('/user/login', async (req: Request, res: Response) => {
	const name = req.body.name;
	const userPass = req.body.password;

	await userModel.findOne({ name }, (err, doc) => {
		if (err) {
			return res.send({ error: 'Error logging in!!!' });
		} else {
			bcrypt.compare(userPass, doc!.password, (err, result) => {
				if (result) return res.send(doc);
				return res.send({ error: 'Error logging in!!!', msg: err });
			});
		}
	});
});

UserRouter.get('/user/logout', (req: Request, res: Response<string>) => {
	res.send('LogOut');
});

UserRouter.post('/user/signup', async (req: Request, res: Response<{}>) => {
	const { name, usn, password } = req.body;
	const dbUser = await userModel.findOne({ name });

	if (dbUser === null)
		return bcrypt.hash(password, 7, async (err, hashedPassword) => {
			if (err) return res.status(500).send({ error: err.message });
			const user = new userModel({ name, usn, password: hashedPassword });
			await user.save();
			res.send(user);
		});

	return res.status(401).send({ error: 'Error creating user' });
});

UserRouter.get('/user/forgotpassword', (req: Request, res: Response<string>) => {
	res.send('ForgotPassword');
});
