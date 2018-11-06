const app = require('./app');
const server = app.listen();
const request = require('supertest').agent(server);

describe('case test', function() {
  after(function() {
    server.close();
  });

  it('/hello should say "你好"', function(done) {
    request
    .get('/hello')
    .expect(200)
    .expect('你好', done)
  });
  it('/name should say "蘇川民"', function(done) {
    request
    .get('/name')
    .expect(200)
    .expect('蘇川民', done)
  });
  it('/id should say "110510508"', function(done) {
    request
    .get('/id')
    .expect(200)
    .expect('110510508', done)
  });
  it('/ should status = 404', function(done) {
    request
    .get('/')
    .expect(404, done)
  });
});