import { Router } from 'express';
import auth from '../auth';
import db from '../../database/db';
import { formatISO } from 'date-fns';

const router = Router();

router.get('/', auth.required, (req, res, next) => {
  db.all('SELECT * FROM tasks', (error, result) => {
    // console.log(error, result)
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.post('/', auth.required, (req, res, next) => {
  // const { id } = req.params;
  const { label, list, status, scheduled } = req.body;
  const now = formatISO(new Date());
  db.get('INSERT INTO tasks (label, list, status, scheduled, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)', [label, list, status, scheduled, now, now], (error, result) => {
    // console.log(error, result)
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.get('/:id', auth.required, (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', id, (error, result) => {
    // console.log(error, result)
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.patch('/:id', auth.required, (req, res, next) => {
  const { id } = req.params;
  const { label, status, scheduled, list, completedAt } = req.body;
  console.log(label, id, completedAt);
  db.run(`UPDATE tasks SET label = ?, status = ?, scheduled = ?, list = ?, updatedAt = ?, completedAt = ? WHERE id = ?`, [label, status, scheduled, list, formatISO(new Date()), completedAt, parseInt(id, 10)], (error: Error | null, result: any) => {
    console.log(error, result)
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

export default router;
