import express from "express"
import cors from "cors"
import pool from './db.js'
import router from "./routes.js"
app.use("/api", router)

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => { 
    res.send("server is running")
})

app.get("/test-db", async (req, res) => {

    try {
        const result = await pool.query("SELECT NOW()")
        res.json({ message: 'Database connected', time: result.rows[0].now })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})