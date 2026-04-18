import { useState, useEffect } from 'react';


function App() {
  const [todos, setTodos] = useState([])
  const [titles, setTitles] = useState('')
};


useEffect(() => {
  fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos')
    const data = await response.json()
    setTodos(data)
  };
  
  const createTodo = async () => {
    if (!title) return
    await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: { 'Conent-Type': 'Application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTodos()
  }


  const toggleTodo = async (id) => {
    await fetch('http://localhost:3000/api/todos/${id}', {
      method: 'PUT'
    })
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await fetch('http://localhost:3000/api/todos/${id}', {
      method: 'DELETE'
    })
    fetchTodos()
  }

export default App
