const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogrouter = require('express').Router()
const Blog = require('../models/Blog')

app.use(cors())
app.use(bodyParser.json())
/*if (process.env.NODE_ENV !== 'production') {
  }
  */
require('dotenv').config()
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

blogrouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogrouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  console.log(request.body)
  blog.save().then(result => {
    response.status(201).json(result)
  })
})
module.exports = blogrouter
