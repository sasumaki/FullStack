const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const jwt = require('express-jwt')

const http = require('http')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const PORT =
  process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to database', url)
  })
  .catch(err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(
  jwt({
    secret: process.env.SECRET,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1]
      } else if (req.query && req.query.token) {
        return req.query.token
      }
      return null
    }
  })
)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app,
  server
}
