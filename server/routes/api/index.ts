import { Router } from 'express';
import usersRoutes from './users';
import tasksRoutes from './tasks';
import listsRoutes from './lists';

const router = Router();

router.use('/users', usersRoutes);
router.use('/tasks', tasksRoutes);
router.use('/lists', listsRoutes);

export default router;