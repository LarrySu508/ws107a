const M = module.exports = {}

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