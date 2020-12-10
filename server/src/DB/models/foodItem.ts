import { Schema, model, Document } from 'mongoose';

export interface FoodType extends Document {
	name: string;
	food_id: number;
	tags: string[];
	price: number;
	isAvailable: boolean;
	day: string;
	reviews: { userName: string; review: string }[];
	addOns: string[];
}

export const FoodSchema: Schema = new Schema({
	name: { type: String, required: true },
	foodId: { type: Number, required: true, unique: true },
	tags: [{ type: String, required: true }],
	price: { type: Number, required: true },
	isAvailable: { type: Boolean, required: true },
	day: { type: String, required: true },
	reviews: [{ type: { userName: String, review: String } }],
	addOns: [String]
});

export const FoodModel = model<FoodType>('foodItem', FoodSchema);
