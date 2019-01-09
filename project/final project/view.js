var V = module.exports = {}

V.layout = function (title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 30px;
        font: 16px Helvetica, Arial;
        background-color:rgba(250, 129, 48, 0.884);
      }

      h1 {
        font-size: 2em;
        background-color: rgba(88, 250, 48, 0.884);
        text-shadow: 1pt 1pt darkolivegreen;
      }
  
      h2 {
        font-size: 1.2em;
      }

      #botr{
        line-height: 12px;
        width: 50px;
        font-size: 8pt;
        font-family: tahoma;
        margin-top: 10px;
        margin-right: 60px;
        position:absolute;
        top:0;
        right:0;
    }

    #botr1{
      line-height: 12px;
      width: 50px;
      font-size: 8pt;
      font-family: tahoma;
      margin-top: 10px;
      margin-right: 10px;
      position:absolute;
      top:0;
      right:0;
  }

      #gg{
        background-color: white;
      }
  
      #posts{
        margin: 0;
        padding: 0;
        background-color: white;
      }
      #ss{
        height: 45px;
        background-color: white;
      }
      #dd{
        background-color: rgba(229, 0, 250, 0.884);
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
      <section id="content">
        ${content}
      </section>
    </div>
  </body>
  </html>
  `
}

V.listusr = function (posts) {
  let list = []
  let count = 0
  for (let post of posts) {
    if(post == null)continue
    list.push(`
    <li id="ss">
      <h2>${post.title}</h2>
      <p><input type="button" value="讀取貼文" onclick="location.href='/post/${post.id}'">
      <input type="button" value="更新" onclick="location.href='/edit/${post.id}'">
      <input type="button" value="刪除" onclick="location.href='/delete/${post.id}'"></p>
    </li>
    `)
    count ++
  }
  let content = `
  <input type="button" id="botr1" value="登出" onclick="location.href='/logout'">
  <h1>貼文列表</h1>
  <p id="dd">您總共有 <strong>${count}</strong> 則貼文!</p>
  <p><input type="button" value="創建新貼文" onclick="location.href='/post/new'"></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
return V.layout('貼文列表', content)

}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p id="dd">創建一則新貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <h1 id="gg">${post.title}</h1>
    <p id="gg">${post.body}</p>
    <input type="button" value="返回" onclick="location.href='/'">
  </form>
  `)
}

V.showusr = function (post) {
  return V.layout(post.title, `
    <h1 id="gg">${post.title}</h1>
    <p id="gg">${post.body}</p>
    <input type="button" value="返回" onclick="location.href='/listusr'">
  </form>
  `)
}

V.edit = function (post) {
  return V.layout(post.title, `
  <form action="/modify/${post.id}" method="post">
    <p><input type="text" name="title" value=${post.title}></p>
    <p><textarea placeholder="Contents" name="body">${post.body}</textarea></p>
    <p><input type="submit" value="更新"></p>
  </form>
  `)
}
V.log = function () {
  return V.layout('登入帳密', `
  <h1>輸入帳密</h1>
  <p id="dd">你的帳號密碼</p>
  <form action="/check" method="post">
    <p>帳號<input type="text" placeholder="帳號" name="admin"></p>
    <p>密碼<input type="password" placeholder="密碼" name="password"></p>
    <p><input type="submit" value="登入"></p>
    <input type="button" value="返回" onclick="location.href='/'">
  </form>
  `)
}

V.list = function (posts) {
  let list = []
  for (let post of posts) {
    if(post == null)continue
    list.push(`
    <li id="ss">
      <h2>${post.title}</h2>
      <p><input type="button" value="讀取貼文" onclick="location.href='/post/${post.id}'">
    </li>
    `)
  }
  let content = `
  <input type="button" id="botr" value="登入" onclick="location.href='/login'">
  <h1>貼文列表</h1>
  <p id="dd">所有貼文!</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
return V.layout('貼文列表', content)

}

