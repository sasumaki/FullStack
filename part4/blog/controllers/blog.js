const blogrouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('addedBy', {
    username: 1,
    name: 1,
    adult: 1
  })
  return response.json(blogs.map(Blog.format))
})

blogrouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const auth = request.user
    console.log(auth)
    if (!auth.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (
      body.title === undefined ||
      body.author === undefined ||
      body.url === undefined
    ) {
      return response.status(400).json({ error: 'content missing' })
    }
    const user = await User.findById(auth.id)
    console.log(user)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes | 0,
      addedBy: user._id
    })
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    response.status(201).json(saved)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})
blogrouter.delete('/:id', async (request, response) => {
  try {
    const auth = request.user
    if (!auth.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.addedBy.toString() === auth.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response
        .status(401)
        .json({ error: "You're not authorized to delete this" })
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})
blogrouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log(body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(Blog.format(updatedBlog))
  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  }
})
module.exports = blogrouter
