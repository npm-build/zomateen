import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { UserRouter } from './Routers/users';
import './DB/db';

const app = express();
app.use(express.json());
app.use(UserRouter);

app.listen(8000, () => console.log('Server listening on PORT 8000'));

// Auto Increment noOfCancels example

// counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
// 	if(error)
// 		return next(error);
// 	doc.testvalue = counter.seq;
// 	next();
// });
