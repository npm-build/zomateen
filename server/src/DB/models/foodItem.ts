import { Schema, model, Document } from 'mongoose';

export interface FoodType extends Document {
	name: string;
	foodId: number;
	tags: string[];
	price: number;
	isAvailable: string;
	day: string;
	filePath: string;
	reviews: { userName: string; review: string }[];
	addOns: string[];
}

export const FoodSchema: Schema = new Schema({
	name: { type: String, required: true },
	foodId: { type: Number, required: true, unique: true },
	tags: [{ type: String }],
	filePath: { type: String, required: true, unique: true },
	price: { type: Number, required: true },
	isAvailable: { type: String, required: true },
	day: { type: String, required: true },
	reviews: [{ userName: String, review: String }],
	addOns: [String]
});

export const FoodModel = model<FoodType>('foodItem', FoodSchema);
