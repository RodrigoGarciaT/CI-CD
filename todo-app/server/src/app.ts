import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3001;

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create todos.json if it doesn't exist
const todosFile = path.join(dataDir, 'todos.json');
if (!fs.existsSync(todosFile)) {
  fs.writeFileSync(todosFile, JSON.stringify({ todos: [] }));
}

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
