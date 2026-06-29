import express from "express"
import cors from "cors"
import pool from './db.js'
import router from "./routes.js"
import authRouter from './authRoutes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)
app.use('/api/auth', authRouter)

app.get("/", (req, res) => { 
    res.send("server is running")
})

app.get("/test-db", async (req, res) => {

    try {
        const result = await pool.query("SELECT NOW()")
        res.json({ message: 'Database connected', time: result.rows[0].now })
    } catch (error) {
        console.log("DB ERROR:", error.message)
    res.json({ error: error.message })
    }
})

app.listen(3000, () => {
    console.log("server running on port 3000")
})