import express, { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../DB/db';
import { refreshTokenModel } from '../DB/models/refreshTokens';
import { UserType, userModel } from '../DB/models/user';
export const UserRouter = express.Router();

const ACCESS_TOKEN_SECRET =
	'b9b924fac76ced51b717c96b9dc465a68fbbb1396d93ff5b211e71219877e455f36110bd814a3a99858bce40ef552f63c438364ace5afcd8f8dcc2575799f1dd';
const REFRESH_TOKEN_SECRET =
	'aa1e207051c835692d4fb6c9f3073bb5e32e747c12baa3bc0a208c0c6383730466dc626e35fb0a0d64aa1aba5cd8b11e69c4e15df02e40caef7a930854b76e32';

UserRouter.get('/users', async (req: Request, res: Response) => {
	const users = await userModel.find({});
	res.send(users);
});

UserRouter.get('/dropDB', async (req: Request, res: Response) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

UserRouter.post('/user/login', async (req: Request, res: Response) => {
	const name = req.body.name;
	const userPass = req.body.password;
	console.log('getting info');

	await userModel
		.findOne({ name })
		.then(currentUser => {
			if (currentUser === null) return res.sendStatus(404);

			bcrypt.compare(userPass, currentUser.password, async (err, result) => {
				if (result) {
					const user = { name: currentUser.name, usn: currentUser.usn, password: currentUser.password };
					const access_token = generateAccessToken(currentUser);
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

UserRouter.get('/user/logout', (req: Request, res: Response) => {
	res.send('LogOut');
});

UserRouter.post('/user/signup', async (req: Request, res: Response) => {
	const { name, usn, bodypassword } = req.body;
	await userModel
		.findOne({ name })
		.then(dbUser => {
			console.log(dbUser);
			return bcrypt.hash(bodypassword, 7, async (err, hashedPassword) => {
				if (err) return res.status(500).send({ error: err.message });

				const user = new userModel({ name, usn, password: hashedPassword });
				await user.validate(err => {
					if (err) res.send({ error: err });
				});
				await user.save();
				res.send({ message: 'Account created successfully!! Please LogIn' });
			});
		})
		.catch(e => {
			console.log(e);
			return res.status(401).send({ error: 'Error creating user' });
		});
});

UserRouter.patch('/user/forgotpassword', async (req: Request, res: Response) => {
	const name = req.body.name;
	const usn = req.body.usn;
	const password = req.body.password;

	await userModel.updateOne({ name, usn }, { password }, { runValidators: true }, (err, resp) => {
		if (err) {
			return res.send({ error: 'Error updating password!!!' });
		} else {
			return res.send({ msg: 'Password Update successfully' });
		}
	});
});

UserRouter.post('/token', async (req, res) => {
	const refresh_token = req.body.token;
	if (refresh_token === null) return res.sendStatus(401);

	await refreshTokenModel.findOne({ refresh_token }, (err, token) => {
		if (err) return res.sendStatus(403);
		if (refresh_token === token) {
			jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err: any, currentUser: any) => {
				if (err) return res.sendStatus(403);
				const access_token = generateAccessToken(currentUser);
				res.json({ accessToken: access_token });
			});
		}
	});
});

function generateAccessToken(doc: UserType) {
	console.log(doc);
	const user = { name: doc!.name, usn: doc!.usn, password: doc!.password };
	return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '40m' });
}

// function authenticateToken(req: any, res: Response, next: NextFunction) {
// 	const authHeader = req.headers['authorization'];
// 	const token = authHeader!.split(' ')[1];

// 	if (token === null) return res.sendStatus(401);

// 	jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, doc: any): any => {
// 		if (err) return res.sendStatus(403);

// 		const user = { name: doc.name, usn: doc.usn, password: doc.password };
// 		req.user = user;
// 		next();
// 	});
// }
