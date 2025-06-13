import request from 'supertest';
import express from 'express';
import todoRoutes from '../routes/todoRoutes';

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo API', () => {
  it('should get all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Test todo' });
    
    expect(res.status).toBe(201);
    expect(res.body.text).toBe('Test todo');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  it('should toggle todo completion status', async () => {
    // First create a todo
    const createRes = await request(app)
      .post('/api/todos')
      .send({ text: 'Toggle test todo' });
    
    const todoId = createRes.body.id;
    
    // Then toggle it
    const toggleRes = await request(app)
      .patch(`/api/todos/${todoId}/toggle`);
    
    expect(toggleRes.status).toBe(200);
    expect(toggleRes.body.completed).toBe(true);
  });
});
