import { Router } from "express"
import pool from "./db.js"

const router = Router()

//get all todos
router.get("/todos", async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//create a todo
router.post("/todos", async (req, res) => {
    try {
        const { title } = req.body
        const result = await pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [title])
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//update a todo 
router.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body
        const result = await pool.query("UPDATE todos SET title = $1 WHERE id = $2 RETURNING *", [title, id])
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//delete a todo
router.delete ("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        await pool.query("DELETE FROM todos WHERE id = $1", [id])
        res.json({ message: "Todo deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router