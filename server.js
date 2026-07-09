import express from 'express'
import books from './routes/bookRoutes.js'
import review from './routes/reviewRoutes.js'
import connectToDatabase from './config/db.js'
import cors from 'cors'
import { PORT } from './config/env.js'
import arcjetMiddleware from './middleware/arcjet.middleware.js'
import errorMiddleware from './middleware/error.middleware.js'
import favoriteRouter from './routes/favorites.router.js'
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
// app.use(arcjetMiddleware);

app.use('/api', books);
app.use('/api', review);
app.use('/api', favoriteRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, async () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
  await connectToDatabase();
});