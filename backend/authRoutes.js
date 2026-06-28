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
        res.status(500).json({ error: error.message})
    }
})