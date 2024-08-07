import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import contactsRouter from './routes/contacts';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', contactsRouter);



 let server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

})

export { app, server };