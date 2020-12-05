import mongoose from 'mongoose';

const DBURI = 'mongodb://localhost:27017/users';

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true });

export const db = mongoose.connection;

db.on('error', err => {
	console.error(err);
	console.log('database is not connected');
});

console.log('connected!!');
