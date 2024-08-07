import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import contactsRouter from './routes/contacts';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', contactsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});