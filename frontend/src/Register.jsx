import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (data.id) {
        navigate("/login")
    } else {
        alert(data.error)
    }
}

return (
    <div>
        <h1>Register</h1>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p> Already have an Account? <span onClick={() => navigate("/login")} style={{cursor: "pointer", color: "blue" }}>Login</span></p>
    </div>
)
}

export default Register