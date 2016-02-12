var request = require('supertest'),
    expect = require("chai").expect;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
ROOT_DIR = __dirname + '/../..';
var server = request.agent("http://localhost:3000");

var app = express();

// all environments
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

//This allows you to require files relative to the root in any file
requireFromRoot = (function (root) {
  return function (resource) {
    return require(root + "/" + resource);
  }
})(ROOT_DIR);

describe('#/documents', function () {

  var token = null;

  before(function(done) {
    server
        .post('/authenticate')
        .send({ name: 'testuser', pass: '12345' })
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
  });

  it('- should GET status', function (done) {
    server
        .get('/documents/status')
        .set('Authorization', 'Bearer ' + token)
        .expect(200, done);
  });

  it('- should POST search all', function (done) {
    server
        .post('/documents/all')
        .set('Authorization', 'Bearer ' + token)
        .send({ index: 'public_toilets', type: "logs"})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(JSON.parse(res.text)).to.exist;
          done();
        });
  });

  it('- should POST mapping', function (done) {
    server
        .post('/documents/mapping')
        .set('Authorization', 'Bearer ' + token)
        .send({ index: 'public_toilets', type: "logs"})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(JSON.parse(res.text)).to.exist;
          done();
        });
  });

  it('- should POST search string query', function (done) {
    server
        .post('/documents/search/string')
        .set('Authorization', 'Bearer ' + token)
        .send({ index: 'public_toilets', query: "_all:canberra"})
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(JSON.parse(res.text)).to.exist;
          done();
        });
  });
});
