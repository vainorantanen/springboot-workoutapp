import React from 'react'
import { useState, useEffect } from 'react'
import todoService from '../services/todos'

const TodoPage = () => {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState('')
  
    useEffect(() => {
      todoService
        .getAll()
        .then(initialTodos => {
          setTodos(initialTodos)
        })
    }, [])
  
    const handleTodoAdd = async () => {
      if (todo && todo.length > 0) {
        try {
          const res = await todoService.create({ content: todo })
          setTodos(todos.concat(res))
          setTodo('') 
        } catch (error) {
          console.log(error)
        }
      }
    }
  
  const handleDelete = async (todo) => {
    try {
      await todoService.remove(todo.id)
      setTodos(todos.filter(t => t.id !== todo.id))
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleDone = async (todo) => {
    try {
      const res = await todoService.update({...todo, isDone: !todo.isDone})
      setTodos(todos.map(t => t.id !== todo.id ? t : res))
    } catch (error) {
      console.log(error)
    }
  }
  
  if (!todos) {
    return (
      <div>
        <h1>No todos</h1>
      </div>
    )
  }
  
    return (
      <div>
        <h1>Todo App</h1>
        <p>Lisää uusi todo</p>
        <input
          type="text"
          value={todo}
          onChange={({ target }) => setTodo(target.value)}
        />
        <button onClick={handleTodoAdd}>Lisää</button>
        <p>Todo lista:</p>
        <ul>
          {todos.map(t => (
            <li key={t.id}>{t.content} {t.isDone ? '(Tehty)' : '(Tekemättä)'}
            <button onClick={() => handleDone(t)}>Merkitse {t.isDone ? 'tekemättömäksi' : 'tehdyksi'}</button>
            <button onClick={() => handleDelete(t)}>Poista</button></li>
          ))}
        </ul>
      </div>
    );
}

export default TodoPage