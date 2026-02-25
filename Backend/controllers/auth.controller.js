const User = require('../models/auth.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {getDBPath, readDB, writeDB} = require('../services/file.service')

const key = 'user'
const DBPath = getDBPath(key)

const register = async (req,res)=>{
    const {email, password, confirmPassword} = req.body
    const users = await readDB(DBPath)
    if(users.find(u=>u.email===email)){
        return res.status(401).json({message: 'Email already exists'}).send()
    }
    if(password !== confirmPassword){
        return res.status(400).json({message:'Passwords do not match'}).send()
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User(users.length + 1, email, hashedPassword)
    users.push(newUser)
    await writeDB(DBPath, users)
    return res.status(201).json({message: 'User registered successfully'}).send()
}

const login = async (req,res)=>{
    const {email, password} = req.body

    const users = await readDB(DBPath)
    const user = users.find(u=>u.email===email)
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'}).send()
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        console.log('Invalid password attempt for user:', email)
        return res.status(401).json({
            message: 'Invalid email or password'
        }).send()
    }
    const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return res.json({message: 'Login successful', token}).send()
}

module.exports = {
    register,
    login
}