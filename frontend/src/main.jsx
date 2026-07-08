import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App.jsx'
import Login from "./Login.jsx"
import Register from "./Register.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="Register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
