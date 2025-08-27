import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Todo } from './Todo.jsx'

test('renders text and state', () => {
  const todo = {
    text: 'todos item 1',
    done: false
  }
  render(<Todo todo={todo} deleteTodo={()=>{}} completeTodo={()=>{}} />);
  const todoText = screen.getByText('todos item 1');
  const doneText = screen.getByText('This todo is not done');
  expect(todoText).toBeInTheDocument();
  expect(doneText).toBeInTheDocument();
});
