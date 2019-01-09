const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const session = require('koa-session')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.keys = ['some secret hurr']

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true, 
  signed: true, 
  rolling: false,
  renew: false 
}

app.use(logger())
app.use(koaBody())
app.use(session(CONFIG, app))

router
  .get('/', list)
  .get('/logout', logout)
  .get('/listusr', listusr)
  .get('/login', login)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/edit/:id', edit)
  .get('/delete/:id', remove)
  .post('/post', create)
  .post('/modify/:id', modify)
  .post('/check', check)

app.use(router.routes())

async function logout (ctx) {
  login_status = false
  ctx.session.account = null
  ctx.redirect('/')
}
async function list (ctx) {
  const posts = M.list()
  ctx.body = await V.list(posts)
}

async function listusr (ctx) {
  const posts = M.list()
  ctx.body = await V.listusr(posts)
}

async function add (ctx) {
  ctx.body = await V.new()
}
async function login (ctx) {
  ctx.body = await V.log()
}
var login_status = false
async function check (ctx) {
  const post = ctx.request.body
  login_status=await M.check(post)
  console.log(login_status)
  if(login_status){
  ctx.session.account = post.account
  ctx.redirect('/listusr')
  }
  else
  ctx.redirect('/login')
}
async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  if(login_status){
    ctx.session.account = post.account
    ctx.body = await V.showusr(post)
    }
    else
    ctx.body = await V.show(post)
}
async function remove (ctx) {
  const id = ctx.params.id
  const post = M.remove(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.redirect('/listusr')
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/listusr')
}
async function edit (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.edit(post)
}
async function modify (ctx) {
  const post = ctx.request.body
  post.id = ctx.params.id
  M.modify(post)
  ctx.redirect('/listusr')
}

app.start = async function () {
  await M.init()
  if (!module.parent) app.listen(3000)
  console.log('Server run at http://localhost:3000')
}

app.start()