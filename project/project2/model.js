const M = module.exports = {}

const posts = []

const user1 = {account:'jack' , password:'123'}

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

M.check = function(post){
 if(post.account == user1.account && post.password == user1.password){
    return "登入成功";
  }else{
    return "登入失敗";
  }
}