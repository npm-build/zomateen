import express, { Request, Response, NextFunction } from 'express';
import { db } from '../DB/db';
import { authenticateToken } from '../utils/token';
import { FoodModel } from '../DB/models/foodItem';
import { UploadedFile } from 'express-fileupload';

export const FoodRouter = express.Router();

FoodRouter.get('/api/getfoodies', authenticateToken, async (req: Request, res: Response) => {
	const foodies = await FoodModel.find({});
	res.send(foodies);
});

FoodRouter.get('/api/food/dropDB', async (req: Request, res: Response) => {
	await db.dropDatabase();
	res.send({ msg: 'Db dropped' });
});

FoodRouter.post('/api/food/add', authenticateToken, authenticateUser, async (req: Request, res: Response) => {
	const { name, foodId, tags, price, isAvailable, day } = req.body;

	if (!req.files) {
		return res.status(400).json({ msg: 'No file uploaded' });
	}

	const file: UploadedFile = req.files['filePath'] as UploadedFile;

	file.mv(`${__dirname}/uploads`, err => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	});

	const filePath = `${__dirname}/uploads`;
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

	const foodItem = new FoodModel({
		name,
		foodId,
		tags,
		filePath,
		isAvailable,
		price,
		day
	});

	await foodItem
		.save()
		.then(resp => {
			return res.send({ message: 'Food Item Added successfully' });
		})
		.catch((e: Error) => {
			console.log(e);
			return res.status(401).send({ error: e });
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
		console.log('Error authenticating user!!!');
		return res.send('Error authenticating user!!!');
	} else next();
}
