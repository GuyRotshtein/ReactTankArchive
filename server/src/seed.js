import dotenv from 'dotenv';
import { connectDb } from './db.js';
import { Tank } from './models/Tank.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
await connectDb(mongoUri);

// Importing the same starter data used in the client (so the UI works immediately)
const { tanksData } = await import('../../src/data/tanksData.js');

await Tank.deleteMany({});

// Converting "id" (client) -> _id (mongo) by dropping it; Mongo will generate ids
const docs = tanksData.map((t) => {
  const { id, ...rest } = t;
  return rest;
});

await Tank.insertMany(docs);

console.log(`✅ Seeded ${docs.length} tanks`);
process.exit(0);
