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
    if (data.token)
}
