import express from 'express'
import books from './routes/bookRoutes.js'
import review from './routes/reviewRoutes.js'
import connectToDatabase from './config/db.js'
import cors from 'cors'
import { PORT } from './config/env.js'
import errorMiddleware from './middleware/error.middleware.js'
import favoriteRouter from './routes/favorites.router.js'
import profileRouter from './routes/profile.router.js'
import { clerkMiddleware } from '@clerk/express';
import searchRouter from './routes/search.router.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use('/api', books);
app.use('/api', review);
app.use('/api', favoriteRouter);
app.use('/api/users', profileRouter);
app.use('/api', searchRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(PORT, async () => {
  console.log(`Example app listening on http://localhost:${PORT}`);
  await connectToDatabase();
});