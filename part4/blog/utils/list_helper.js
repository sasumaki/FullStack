const _ = require('lodash')
const dummy = blogs => {
  return 1
}
const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}
const mostLikes = blogs => {
  let max = 0
  let topBlog = undefined
  blogs.map(blog => {
    if (blog.likes > max) {
      max = blog.likes
      topBlog = blog
    }
  })
  return topBlog
}
const mostBlogs = blogs => {
  blogs = _.countBy(blogs, 'author', blog => {
    blog.author
  })
  topAuthor = _.max(Object.keys(blogs), o => {
    return blogs[o]
  })
  maxBlog = {
    author: topAuthor,
    blogs: blogs[topAuthor]
  }

  return maxBlog
}
const authorWithMostLikes = blogs => {
  blogs = _.groupBy(blogs, 'author', blog => {
    return blog.author
  })
  topBlogger = _.maxBy(
    Object.values(blogs).map(blog => {
      let reduced = _.reduce(
        blog,
        (sum, blog) => {
          return sum + blog.likes
        },
        0
      )

      return { author: blog[0].author, likes: reduced }
    }),
    val => {
      return val.likes
    }
  )
  return topBlogger
}
module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  authorWithMostLikes
}
