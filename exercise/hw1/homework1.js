const http = require('http')
const server = http.createServer(function (req, res) {
    switch (req.url) {
        case '/hello':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.write('你好');
        break;
        case '/name':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.write('蘇川民');
        break;
        case '/id':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.write('110510508');
        break;
        default:
        res.statusCode = 404;
        res.end();
        break;
      }
})
server.listen(3000)

console.log('Server running at http://localhost:3000')