import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import { join, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001;

// Get the directory path using import.meta.url (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure data directory exists
const dataDir = join(__dirname, 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

// Create todos.json if it doesn't exist
const todosFile = join(dataDir, 'todos.json');
if (!existsSync(todosFile)) {
  writeFileSync(todosFile, JSON.stringify({ todos: [] }));
}

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
