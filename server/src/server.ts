import express from 'express';
import fileUpload from 'express-fileupload';
import { UserRouter } from './Routers/users';
import { FoodRouter } from './Routers/food';
import { AdminRouter } from './Routers/admins';
import './DB/db';

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use('/src/uploads', express.static('./src/uploads'));
app.use(UserRouter);
app.use(FoodRouter);
app.use(AdminRouter);

app.listen(8000, () => console.log('Server listening on PORT 8000'));

// Auto Increment noOfCancels example

// counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
// 	if(error)
// 		return next(error);
// 	doc.testvalue = counter.seq;
// 	next();
// });
