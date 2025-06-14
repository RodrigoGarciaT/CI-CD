import { Request, Response, NextFunction } from 'express';
import { join, dirname } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import { nanoid } from 'nanoid';
import { Todo } from '../models/todo';

interface Schema {
  todos: Todo[];
}

// Get the project root directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..'); // src directory
const dataDir = join(projectRoot, 'data');

// Ensure data directory exists
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const file = join(dataDir, 'todos.json');
// Create todos.json if it doesn't exist
if (!existsSync(file)) {
  writeFileSync(file, JSON.stringify({ todos: [] }));
}

const adapter = new FileSync<Schema>(file);
const db = lowdb(adapter);

// Initialize the database with default data
db.defaults({ todos: [] }).write();

export const getTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos = db.get('todos').value();
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const addTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const todo: Todo = {
      id: nanoid(),
      text,
      completed: false,
    };
    
    db.get('todos')
      .push(todo)
      .write();
      
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const toggleTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = db.get('todos').find({ id }).value();
    
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    const updatedTodo = { ...todo, completed: !todo.completed };
    db.get('todos')
      .find({ id })
      .assign(updatedTodo)
      .write();
    
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
