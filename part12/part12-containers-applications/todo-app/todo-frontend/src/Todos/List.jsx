import React from 'react'
import { Todo } from './Todo.jsx'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    todos.map(todo => (<Todo key={todo._id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo}/>))
  )
}

export default TodoList
