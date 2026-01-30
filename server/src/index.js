import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import { tanksRouter } from './routes/tanks.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tanks', tanksRouter);

// Basic error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const mongoUri = process.env.MONGODB_URI;

await connectDb(mongoUri);
console.log('✅ Connected to MongoDB');

app.listen(port, () => {
  console.log(`🚀 API listening on http://localhost:${port}`);
});
