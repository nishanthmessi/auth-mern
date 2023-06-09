import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Server is up and running')
})

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`)
})