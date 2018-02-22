const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
blogSchema.statics.format = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id,
    addedBy: blog.addedBy
  }
}
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
