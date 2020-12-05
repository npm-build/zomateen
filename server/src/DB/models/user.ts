import { Schema, model } from 'mongoose';

export const userSchema = new Schema({
	name: String,
	usn: String,
	noOfCancels: Number
});

// Creating the Models

export const userModel = model('user', userSchema);
