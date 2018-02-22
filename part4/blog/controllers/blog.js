const blogrouter = require('express').Router()
const Blog = require('../models/Blog')

const format = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}
blogrouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs.map(format))
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
blogrouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
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
    response.json(format(updatedBlog))
  } catch (error) {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
  }
})
module.exports = blogrouter
