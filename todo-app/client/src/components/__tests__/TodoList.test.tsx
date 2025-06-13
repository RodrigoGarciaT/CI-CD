import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoList } from '../TodoList';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('TodoList', () => {
  beforeEach(() => {
    mockAxios.get.mockResolvedValue({ data: [] });
  });

  it('renders todo list', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add new todo')).toBeInTheDocument();
  });

  it('allows adding new todos', async () => {
    const newTodo = { id: '1', text: 'Test todo', completed: false };
    mockAxios.post.mockResolvedValue({ data: newTodo });
    mockAxios.get.mockResolvedValue({ data: [newTodo] });

    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/api/todos', {
      text: 'Test todo'
    });
  });
});
