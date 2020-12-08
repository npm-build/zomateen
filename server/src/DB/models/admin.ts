import { Schema, model, Document } from 'mongoose';

export interface AdminType extends Document {
	collegeId: string;
	first_name: string;
	last_name: string;
	user_name: string;
	password: string;
	phone: number;
}

export const AdminSchema: Schema = new Schema({
	collegeId: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	userName: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phone: { type: Number, required: true, unique: true }
});

export const AdminModel = model<AdminType>('admin', AdminSchema);
