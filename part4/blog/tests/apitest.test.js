const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain('TDD harms architecture')
})
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Fuckboy Unlimited 101',
    author: 'Arseni Leskinen',
    url: 'http://www.walrussquad.io/blog/fuckkkboiiii',
    likes: 69
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('Fuckboy Unlimited 101')
})
test('blog without author is not added ', async () => {
  const newBlog = {
    title: 'Fuckboy Unlimited 101',
    url: 'http://www.walrussquad.io/blog/fuckkkboiiii',
    likes: 69
  }
  const intialNotes = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(intialNotes.body.length)
})
test('blog without title is not added ', async () => {
  const newBlog = {
    author: 'Arseni Leskinen',
    url: 'http://www.walrussquad.io/blog/fuckkkboiiii',
    likes: 69
  }
  const intialNotes = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(intialNotes.body.length)
})
test('blog without url is not added ', async () => {
  const newBlog = {
    title: 'Fuckboy Unlimited 101',
    author: 'Arseni Leskinen',
    likes: 69
  }
  const intialNotes = await api.get('/api/blogs')

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(intialNotes.body.length)
})
test('blog without likes is added with value zero', async () => {
  const newBlog = {
    author: 'DoomiMörkö',
    title: '0 like squad',
    url: 'http://www.dontgiveahoot.com'
  }
  const beforeAdd = await api.get('/api/blogs')
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(beforeAdd.body.length + 1)
  expect(titles).toContain('0 like squad')
  expect(response.body.find(o => o.title === '0 like squad').likes).toBe(0)
})
afterAll(() => {
  server.close()
})
