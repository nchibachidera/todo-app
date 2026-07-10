import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"



function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("token")


  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    setTodos(data)
  }

  const c reateTodo = async () => {
    if (!title) return
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTodos()
  }

  const toggleTodo = async (id) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      headers: { "Authorization": `Bearer ${token}`}
    })
    fetchTodos()
  }

  const updateTodo = async (id) => {
    await fetch(`http://localhost:3000/api/todos/${id}/title`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
       },
      body: JSON.stringify({ title: editTitle })
    })
    setEditId(null )
    setEditTitle('')
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer{toke}`}
    })
    fetchTodos()
  }

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
  <div>
    <h1>Todo App</h1>
    <button onClick={logout}>logout</button>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter a todo"
    />
    <button onClick={createTodo}>Add</button>

    <p>{todos.filter(todo => todo.is_completed).length} / {todos.length} completed</p>

    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => updateTodo(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ textDecoration: todo.is_completed ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => { setEditId(todo.id); setEditTitle(todo.title) }}>Update</button>
              <small>{new Date(todo.created_at).toLocaleDateString()}</small>
            </>
          )}
        </li>
      ))}
    </ul>
  </div>
)
}

export default App