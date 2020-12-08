import { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
	name: string;
	usn: string;
	password: string;
	noOfCancels: number;
}

export const userSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	userName: { type: String, required: true },
	usn: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: Number, required: true, unique: true },
	noOfCancels: { type: Number, default: 0 },
	reviews: [String]
});

// Creating the Models
export const userModel = model<UserType>('user', userSchema);
