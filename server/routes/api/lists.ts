import { Router } from 'express';
import auth from '../auth';
import db from '../../database/db';

const router = Router();

router.get('/', auth.required, (req, res, next) => {
  db.all('SELECT * FROM lists', (error, result) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.get('/projects', auth.required, (req, res, next) => {
  db.all('SELECT * FROM lists WHERE type="PROJECT"', (error, result) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.get('/areas', auth.required, (req, res, next) => {
  db.all('SELECT * FROM lists WHERE type="AREA"', (error, result) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.post('/', auth.required, (req, res, next) => {
  const { label, list, type } = req.body;
  db.get('INSERT INTO lists (label, list, type, status) VALUES (?, ?, ?, ?)', [label, list, type, 'OPEN'], (error, result) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.get('/:id', auth.required, (req, res, next) => {
  const { id } = req.params;
  db.get('SELECT * FROM lists WHERE id=?', id, (error: Error | null, result: any) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

router.patch('/:id', auth.required, (req, res, next) => {
  const { id } = req.params;
  const { label } = req.body;
  db.run('UPDATE lists SET label = ? WHERE id = ?', label, id, (error: Error | null, result: any) => {
    if (error) {
      res.status(400);
      return res.send(error.message);
    }
    return res.json(result);
  });
});

export default router;
