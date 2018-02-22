const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/Blog')
const { initialBlogs, format, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const blogsInDBstart = await blogsInDb()

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(blogsInDBstart.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await blogsInDb()

  const contents = response.map(r => r.title)

  expect(contents).toContain('TDD harms architecture')
})
test('a valid blog can be added ', async () => {
  const blogsBeforeOperation = await blogsInDb()
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

  const blogsAfterOperation = await blogsInDb()

  const titles = blogsAfterOperation.map(r => r.title)

  expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1)
  expect(titles).toContain('Fuckboy Unlimited 101')
})
test('blog without author is not added ', async () => {
  const newBlog = {
    title: 'Fuckboy Unlimited 101',
    url: 'http://www.walrussquad.io/blog/fuckkkboiiii',
    likes: 69
  }
  const blogsBeforeOperation = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterOperation = await blogsInDb()

  expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
})
test('blog without title is not added ', async () => {
  const newBlog = {
    author: 'Arseni Leskinen',
    url: 'http://www.walrussquad.io/blog/fuckkkboiiii',
    likes: 69
  }
  const initialBlogs = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})
test('blog without url is not added ', async () => {
  const newBlog = {
    title: 'Fuckboy Unlimited 101',
    author: 'Arseni Leskinen',
    likes: 69
  }
  const initialBlogs = await blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})
test('blog without likes is added with value zero', async () => {
  const newBlog = {
    author: 'DoomiMörkö',
    title: '0 like squad',
    url: 'http://www.dontgiveahoot.com'
  }
  const beforeAdd = await blogsInDb()
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(beforeAdd.length + 1)
  expect(titles).toContain('0 like squad')
  expect(response.body.find(o => o.title === '0 like squad').likes).toBe(0)
})
describe('deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'DELETE THIS',
      author: 'Varg Vikernes',
      url: 'www.blackmetalchurch.com'
    })
    await addedBlog.save()
  })
  test('removed blog is removed', async () => {
    const blogsAtStart = await blogsInDb()

    await api.delete(`/api/blogs/${addedBlog._id}`).expect(204)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})
describe('update a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'UPDATE THIS',
      author: 'Sir Lancelot',
      url: 'www.forkingandcountry.com',
      likes: 13
    })
    await addedBlog.save()
  })
  test('updated blog is updated', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
      title: 'UPDATE THIS',
      author: 'Sir Lancelot',
      url: 'www.forkingandcountry.com',
      likes: 69
    }
    await api.put(`/api/blogs/${addedBlog._id}`).send(newBlog)
    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)
    expect(titles).toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    expect(blogsAfterOperation.find(o => o.title === 'UPDATE THIS').likes).toBe(
      newBlog.likes
    )
  })
})
afterAll(() => {
  server.close()
})
