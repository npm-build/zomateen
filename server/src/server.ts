import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { UserRouter } from './Routers/users';
import './DB/db';

const app = express();
app.use(bodyParser.json());
app.use(UserRouter);

app.get('/', (req: Request, res: Response<string>) => {
	res.send('Hello World');
});

app.listen(8000, () => console.log('Server listening on PORT 8000'));
