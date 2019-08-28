var express = require('express');
var app = express();
var queries = require('./dao/queries.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get('/:productId', function (req) {
  queries.readOne(req.params['productId']);
});

app.get('/', function (req) {
    queries.readAll();
});

app.put('/', function (req) {
  queries.create(req.body);
});

app.post('/:productId', function (req) {
    queries.update(req.params['productId'], req.body)
})

app.delete('/:productId', function (req) {
  queries.delete(req.params['productId']);
});

app.get('/', function (req) {
  queries.scan();
});