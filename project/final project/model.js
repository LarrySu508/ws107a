const mongodb = require('mongodb')
const M = module.exports = {
  board: {}
}

M.init = async function () {
  M.client = await mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/')
  M.db = M.client.db('blogdb')
  M.boards = M.db.collection('blogusers')
}

M.check = async function(post){
  var result = await M.boards.findOne(post)
  console.log(post)
  if(result)
  return true
  else 
  return false
}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}

M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}

M.modify = function (post) {
  let oldPost = posts[post.id]
  post.created_at =  oldPost.created_at
  posts[post.id] = post
}
M.remove = function (id) {
  const post = posts[id]
  posts[id] = null
  return post
}

