import { useState } from "React"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
}

const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "post",
        headers: { "Content-Type": "Application/json"},
        body: Json.stringify({ email, password }) 
    })

    const data = await response.json()
    if (data.token) {
        localStorage.setItem("token", data.token)
        navigate("/")
    } else {
        alert(data.error)
    }
}

return (
    <div>
        <h1>Login</h1>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input
        type="password"
        placeholder="Password"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have an Account? <span omClick={() => navigate("/register")} style={{cursor: "pointer", color: "blue"}}>Register</span></p>
    </div>
)