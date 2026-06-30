import { Router } from "express"
import pool from "./db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = Router()

//register
router.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        )
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



//login
routerpost("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        const user = result.rows[0]
        if (!user) return res.status(400).json({ error: "user not found" })
            const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({ error: "wrong password" })
            const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET)
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router