import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    setTodos(data)
  }

  const createTodo = async () => {
    if (!title) return
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTodos()
  }

  const toggleTodo = async (id) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT'
    })
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    })
    fetchTodos()
  }

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a todo"
      />
      <button onClick={createTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.is_completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
