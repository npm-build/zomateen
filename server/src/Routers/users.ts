import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../DB/db';
import { refreshTokenModel } from '../DB/models/refreshTokens';
import { authenticateToken } from '../utils/token';
import { userModel } from '../DB/models/user';
import { generateAccessTokenUser } from '../utils/token';
export const UserRouter = express.Router();

const REFRESH_TOKEN_SECRET =
	'aa1e207051c835692d4fb6c9f3073bb5e32e747c12baa3bc0a208c0c6383730466dc626e35fb0a0d64aa1aba5cd8b11e69c4e15df02e40caef7a930854b76e32';

UserRouter.get('/api/users', async (req: Request, res: Response) => {
	const users = await userModel.find({});
	res.send(users);
});

UserRouter.get('/api/user/dropDB', async (req: Request, res: Response) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

UserRouter.get('/api/user/getUser', authenticateToken, async (req: any, res: Response) => {
	const user = req.user;
	res.send(user);
});

UserRouter.post('/api/user/login', async (req: Request, res: Response) => {
	const userName = req.body.userName;
	const userPass = req.body.password;
	console.log('getting info');

	await userModel
		.findOne({ userName })
		.then(currentUser => {
			if (currentUser === null) return res.sendStatus(404);

			bcrypt.compare(userPass, currentUser.password, async (err, result) => {
				if (result) {
					const user = {
						userName: currentUser.userName,
						usn: currentUser.usn,
						password: currentUser.password
					};
					const access_token = generateAccessTokenUser(currentUser);
					const refresh_token = jwt.sign(user, REFRESH_TOKEN_SECRET);

					const refreshToken = new refreshTokenModel({ token: refresh_token });
					await refreshToken.save();
					return res.send({ accessToken: access_token, refreshToken: refresh_token });
				}
				return res.send({ error: 'Error logging in!!!', msg: err });
			});
		})
		.catch(err => res.send({ error: 'Error logging in!!!', msg: err }));
});

UserRouter.delete('/api/user/logout', async (req: Request, res: Response) => {
	const refresh_token = req.body.token;
	await refreshTokenModel
		.deleteOne({ token: refresh_token })
		.then((resp: any) => {
			console.log(resp);
			res.send('Logged out');
		})
		.catch((e: Error) => {
			console.log(e);
			return res.send({ error: 'Error logging out', msg: e });
		});
});

UserRouter.post('/api/user/signup', async (req: Request, res: Response) => {
	const { firstName, lastName, phone, userName, usn, password } = req.body;
	const bodypassword = password;

	await userModel.findOne({ userName }).then(dbUser => {
		dbUser
			? res.send({ message: 'User already exists' })
			: bcrypt.hash(bodypassword, 7, async (err, hashedPassword) => {
					if (err) return res.status(500).send({ error: err.message });

					const user = new userModel({ firstName, lastName, phone, userName, usn, password: hashedPassword });
					await user.save();
					return res.send({ message: 'Account created successfully!! Please LogIn' });
			  });
	});
});

UserRouter.patch('/api/user/forgotpassword', async (req: Request, res: Response) => {
	const userName = req.body.userName;
	const usn = req.body.usn;
	const password = req.body.password;

	await userModel.updateOne({ userName, usn }, { password }, { runValidators: true }, (err, resp) => {
		if (err) {
			return res.send({ error: 'Error updating password!!!' });
		} else {
			return res.send({ msg: 'Password Update successfully' });
		}
	});
});

UserRouter.post('/api/user/token', async (req, res) => {
	const refresh_token = req.body.token;
	if (refresh_token === null) return res.sendStatus(401);

	await refreshTokenModel.findOne({ refresh_token }, (err, token) => {
		if (err) return res.sendStatus(403);
		if (refresh_token === token) {
			jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err: any, currentUser: any) => {
				if (err) return res.sendStatus(403);
				const access_token = generateAccessTokenUser(currentUser);
				res.json({ accessToken: access_token });
			});
		}
	});
});
