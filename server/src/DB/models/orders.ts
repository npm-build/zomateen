import { Schema, model, Document } from 'mongoose';

export interface FoodType extends Document {
	food_ids: number[];
	customer_names: string[];
	OrderId: number;
	Messages: string;
	isCompleted: boolean;
	dateOfOrder: Date;
}

export const FoodSchema: Schema = new Schema({
	food_ids: [{ type: Number, required: true, unique: true }],
	customer_names: [{ type: String, required: true }],
	OrderId: { type: Number, required: true },
	Messages: String,
	isCompleted: { type: Boolean, required: true },
	dateOfOrder: { type: Date, default: Date() }
});

export const FoodModel = model<FoodType>('admin', FoodSchema);
