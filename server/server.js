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

app.listen(5000, () => {
  console.log("Server is running on port 5000")
  try {
    
  } catch (error) {
    
  }
})