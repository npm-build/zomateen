import express, { Request, Response, NextFunction } from 'express';
import { db } from '../DB/db';
import { authenticateToken } from '../utils/token';
import { FoodModel } from '../DB/models/foodItem';
export const FoodRouter = express.Router();

FoodRouter.get('/api/getfoodies', authenticateToken, async (req: Request, res: Response) => {
	const foodies = await FoodModel.find({});
	res.send(foodies);
});

FoodRouter.get('/api/food/dropDB', authenticateToken, authenticateUser, async (req: Request, res: Response) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

FoodRouter.post('/api/food/add', authenticateToken, authenticateUser, async (req: Request, res: Response) => {
	const { name, foodId, tags, price, isAvailable, day } = req.body;

	await FoodModel.findOne({ name })
		.then(async food => {
			if (food?.name == name) {
				return res.send({ message: 'Food Item already exists' });
			}
		})
		.catch(e => {
			console.log(e);
			return res.status(401).send({ error: e });
		});

	const foodItem = new FoodModel({ name, foodId, tags, isAvailable, price, day });

	await foodItem
		.save()
		.then(resp => {
			console.log(resp);
			res.send({ message: 'Food Item Added successfully' });
		})
		.catch((e: Error) => {
			console.log(e);
			res.status(401).send({ error: e });
		});
});

FoodRouter.patch('/api/food/update', authenticateToken, authenticateUser, async (req: Request, res: Response) => {
	const { name, foodId, tags, price, day } = req.body;

	if (tags) {
		await FoodModel.updateOne({ name, foodId }, { tags }, { runValidators: true }, (err, resp) => {
			if (err) {
				return res.send({ error: 'Error updating password!!!' });
			} else {
				return res.send({ msg: 'Password Update successfully' });
			}
		});
	} else if (price) {
		await FoodModel.updateOne({ name, foodId }, { price }, { runValidators: true }, (err, resp) => {
			if (err) {
				return res.send({ error: 'Error updating password!!!' });
			} else {
				return res.send({ msg: 'Password Update successfully' });
			}
		});
	} else if (day) {
		await FoodModel.updateOne({ name, foodId }, { day }, { runValidators: true }, (err, resp) => {
			if (err) {
				return res.send({ error: 'Error updating password!!!' });
			} else {
				return res.send({ msg: 'Password Update successfully' });
			}
		});
	} else return res.send({ msg: 'Field not updatable' });
});

FoodRouter.delete('/api/food/delete', authenticateToken, authenticateUser, async (req: Request, res: Response) => {
	const { foodId } = req.body;

	await FoodModel.deleteOne({ foodId })
		.then(() => {
			return res.send({ msg: 'Food Item deleted' });
		})
		.catch((e: Error) => {
			console.log(e);
			return res.status(401).send({ error: 'Error creating user' });
		});
});

function authenticateUser(req: any, res: Response, next: NextFunction) {
	const user = req.user;
	if (user.usn) {
		return res.send('Error authenticating user!!!');
	} else next();
}
