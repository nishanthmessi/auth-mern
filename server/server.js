require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.port}`)
  try {
    mongoose.connect(process.env.DB_URL)
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("Something went wrong", error)
  }
})