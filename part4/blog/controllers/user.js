const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
    likes: 1
  })
  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }
    if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: 'Password must be atleast 3 characters long' })
    }
    const saltRounds = 13
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult | 1,
      passwordHash: passwordHash
    })
    const saved = await user.save()
    return response.status(200).json(saved)
  } catch (error) {
    return response.status(500).json({ error: 'something went wrong' })
  }
})
module.exports = usersRouter
