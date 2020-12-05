import { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
	name: string;
	usn: string;
	password: string;
	noOfCancels: number;
}

export const userSchema: Schema = new Schema({
	name: { type: String, required: true, unique: true },
	usn: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	noOfCancels: { type: Number, default: 0 }
});

// Creating the Models
export const userModel = model<UserType>('user', userSchema);
