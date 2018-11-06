const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  // console.log('url=', ctx.url)
  switch (ctx.url) {
    case '/hello': ctx.body = '你好'; break
    case '/name' : ctx.body = '蘇川民'; break
    case '/id' : ctx.body = '110510508'; break
    default : ctx.status = 404
  }
  // ctx.body = 'Hello World';
});

if (!module.parent) app.listen(3000);