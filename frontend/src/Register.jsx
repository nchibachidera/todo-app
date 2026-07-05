import { useState } from "React"
import { useNavigate } from "react-router-dom"

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
}

const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "Post",
        headers: { "Content-Type": "Application/Json" },
        body: Json.stringify({ email, password })
    })
}