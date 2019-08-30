'use strict';

const _ = require('lodash');
const mongodb = require('mongodb');
const uuid = require('uuid');

const MongoClient = mongodb.MongoClient;
const url = process.env.MONGO_HOST ? `mongodb://${process.env.MONGO_HOST}:27017/product-service` : 'mongodb://localhost:27017/product-service';

module.exports = {

  create: (data) => new Promise((resolve, reject) => {
    data.updatedAt = new Date().getTime();
    MongoClient.connect(url, (cerr, db) => {
      if (cerr) {
        reject(cerr);
      } else {
        db.collection('products').insertOne(data, (errInsert) => {
          if (errInsert) {
            reject(errInsert);
          } else {
            resolve(JSON.stringify(data));
            db.close();
          }
        });
      }
    });
  }),

  update: (productId, data) => new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        db.collection('products', (errC, doc) => {
          if (errC) {
            reject(errC);
          } else {
            doc.find().toArray((ferr, docEntries) => {
              if (ferr) {
                reject(ferr);
              } else {
                const entry = _.find(docEntries, e => e.productId === productId);
                const newEntry = _.cloneDeep(entry);
                _.assign(newEntry, data, { id: uuid.v1(), updatedAt: new Date().getTime() });
                doc.updateOne(entry, { $set: newEntry }, (uerr) => {
                  if (uerr) {
                    reject(uerr);
                  } else {
                    db.close();
                    resolve(JSON.stringify(newEntry));
                  }
                });
              }
            });
          }
        });
      }
    });
  }),

  delete: (productId) => new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        db.collection('products', (errC, doc) => {
          if (errC) {
            reject(ferr);
          } else {
            doc.find().toArray((ferr, docEntries) => {
              if (ferr) {
                reject(ferr);
              } else {
                const entry = _.find(docEntries, entry => entry.productId === productId);
                doc.deleteOne(entry, (derr) => {
                  if (derr) {
                    reject(derr);
                  } else {
                    db.close();
                    resolve(JSON.stringify(entry));
                  }
                });
              }
            });
          }
        });
      }
    });
  }),

  readAll: () => new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        db.collection('products').find().toArray((ferr, docEntries) => {
          if (ferr) {
            reject(ferr);
          } else {
            db.close();
            resolve(JSON.stringify(docEntries));
          }
        });
      }
    });
  }),

  readOne: (productId) => new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      } else {
        db.collection('products').find().toArray((ferr, docEntries) => {
          if (ferr) {
            reject(ferr);
          } else {
            const entry = _.find(docEntries, entry => entry.productId === productId);
            db.close();
            resolve(JSON.stringify(entry));
          }
        });
      }
    });
  }),

}
