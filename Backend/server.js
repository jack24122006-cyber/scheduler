const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')

// Load env variables
dotenv.config()
const PORT = process.env.PORT || 3000

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


// Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})