import express, { Request, Response } from 'express';
import { db } from '../DB/db';
import { authenticateToken } from '../utils/token';
import { FoodModel } from '../DB/models/foodItem';
export const FoodRouter = express.Router();

FoodRouter.get('/api/getfoodies', authenticateToken, async (req: Request, res: Response) => {
	const foodies = await FoodModel.find({});
	res.send(foodies);
});

FoodRouter.get('/api/food/dropDB', authenticateToken, async (req: Request, res: Response) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

FoodRouter.post('/api/food/add', authenticateToken, async (req: Request, res: Response) => {
	const { name, foodId, tags, price, day } = req.body;

	await FoodModel.findOne({ name })
		.then(async food => {
			if (food.name == name) {
				res.send({ message: 'Food Item already exists' });
			} else {
				const foodItem = new FoodModel({ name, foodId, tags, price, day });
				await foodItem.validate(err => {
					if (err) res.send({ error: err });
				});
				await foodItem.save();
				res.send({ message: 'Food Item Added successfully' });
			}
		})
		.catch(e => {
			console.log(e);
			return res.status(401).send({ error: 'Error creating user' });
		});
});

FoodRouter.patch('/api/food/update', authenticateToken, async (req: Request, res: Response) => {
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

FoodRouter.delete('/api/food/add', authenticateToken, async (req: Request, res: Response) => {
	const { name, foodId } = req.body;

	await FoodModel.deleteOne({ name, foodId })
		.then(() => {
			return res.send({ msg: 'Food Item deleted' });
		})
		.catch(e => {
			console.log(e);
			return res.status(401).send({ error: 'Error creating user' });
		});
});
