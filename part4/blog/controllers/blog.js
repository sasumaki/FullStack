const blogrouter = require('express').Router()
const Blog = require('../models/Blog')

blogrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogrouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (
      body.title === undefined ||
      body.author === undefined ||
      body.url === undefined
    ) {
      return response.status(400).json({ error: 'content missing' })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes | 0
    })
    console.log(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})
module.exports = blogrouter
