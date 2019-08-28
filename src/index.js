var express = require('express');
var app = express();
var queries = require('./dao/queries.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

PORT = process.env.PORT ? process.env.PORT : 3000;

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get('/:productId', function (req, res) {
  queries.readOne(req.params['productId']).catch((error) => {
    res.status(500)
      .send(error);
  }).then( (product) => {
    if (product) {
      res.send(JSON.stringify(product));
    } else {
      res.status(404)
        .send('Not found');
    }
  });
});

app.get('/', function (req, res) {
  queries.readAll().catch((error) => {
    res.status(500)
      .send(error);
  }).then((products) => {
    res.status(200)
      .send(products);
  });
});

app.put('/', function (req) {
  queries.create(req.body).catch((error) => {
    res.status(500)
      .send(error);
  }).then((product) => {
    res.status(200)
      .send(product);
  });
});

app.post('/:productId', function (req) {
    queries.update(req.params['productId'], req.body).catch((error) => {
      res.status(500)
        .send(error);
    }).then((product) => {
      res.status(200)
        .send(product);
    });
})

app.delete('/:productId', function (req) {
  queries.delete(req.params['productId']).catch((error) => {
    res.status(500)
      .send(error);
  }).then((product) => {
    res.status(200)
      .send(product);
  });
});
