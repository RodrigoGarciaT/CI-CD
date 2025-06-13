import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await axios.post('http://localhost:3001/api/todos', { text: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await axios.patch(`http://localhost:3001/api/todos/${id}/toggle`);
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="todo-input"
          placeholder="Add new todo"
        />
        <button onClick={addTodo} className="todo-button">
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="todo-item"
            onClick={() => toggleTodo(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span className={todo.completed ? 'todo-text todo-completed' : 'todo-text'}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
