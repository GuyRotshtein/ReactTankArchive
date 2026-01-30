import express from 'express';
import { Tank } from '../models/Tank.js';

export const tanksRouter = express.Router();

// POST /api/tanks/admin/login
tanksRouter.post('/admin/login', async (req, res) => {
  const { password } = req.body;
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === expected) {
    return res.json({ success: true });
  }
  
  return res.status(401).json({ success: false, message: 'Invalid password' });
});

// POST /api/tanks/reset
tanksRouter.post('/reset', async (req, res) => {
  const headerPwd = req.header('x-admin-password');
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  if (headerPwd !== expected) return res.status(401).json({ message: 'Unauthorized' });

  const { tanksData } = await import('../../../src/data/tanksData.js');
  await Tank.deleteMany({});
  const docs = tanksData.map(({ id, ...rest }) => rest);
  await Tank.insertMany(docs);
  res.json({ message: 'Reset complete', count: docs.length });
});

// GET /api/tanks
tanksRouter.get('/', async (_req, res) => {
  const tanks = await Tank.find().sort({ createdAt: -1 });
  res.json(tanks);
});

// GET /api/tanks/:id
tanksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tank = await Tank.findById(id);
  if (!tank) return res.status(404).json({ message: 'Tank not found' });
  res.json(tank);
});

// POST /api/tanks
tanksRouter.post('/', async (req, res) => {
  try {
    const created = await Tank.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: 'Invalid tank data', error: err.message });
  }
});

// PUT /api/tanks/:id
tanksRouter.put('/:id', async (req, res) => {
  try {
    const updated = await Tank.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Tank not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Invalid tank data', error: err.message });
  }
});

// DELETE /api/tanks/:id
tanksRouter.delete('/:id', async (req, res) => {
  const deleted = await Tank.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Tank not found' });
  res.json({ message: 'Deleted', id: req.params.id });
});
