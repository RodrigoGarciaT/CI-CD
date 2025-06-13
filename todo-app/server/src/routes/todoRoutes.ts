import { Router, RequestHandler } from 'express';
import { getTodos, addTodo, toggleTodo } from '../controllers/todoController';

const router = Router();

router.get('/', getTodos as RequestHandler);
router.post('/', addTodo as RequestHandler);
router.patch('/:id/toggle', toggleTodo as RequestHandler);

export default router;
