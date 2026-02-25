const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
require('./config/env.validation')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Routes initialization
app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.use('/api/grade', require('./routes/grade.routes'))
app.use('/api/auth', require('./routes/auth.routes'))


// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})