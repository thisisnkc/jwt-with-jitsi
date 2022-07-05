const express = require('express');
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken');
const {connectDB} = require('./config');

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/jwt" , require('./jwtroute'))
const port = process.env.PORT || 8000

app.listen(port , console.log(`Listening on ${port}`))
