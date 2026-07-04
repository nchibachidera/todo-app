import { Router } from "express"
import pool from "./db.js"
import authMiddleware from "./authMiddleware.js"

const router = Router()

// get all todos
router.get("/todos", authMiddleware, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC", [req.userId])
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// create a todo
router.post("/todos",  authMiddleware, async ( req, res) => {
    try {
        const { title } = req.body
        const result = await pool.query("INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *", [title, req.userId])
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// toggle is_completed
router.put("/todos/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 AND user_id = $2 RETURNING *", [id, req.userId])
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}) 

// update title
router.put("/todos/:id/title", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const result = await pool.query("UPDATE todos SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *", [title, id, req.userId])
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// delete a todo
router.delete("/todos/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params
        await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2", [id, req.userId])
        res.json({ message: "Todo deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


export default router