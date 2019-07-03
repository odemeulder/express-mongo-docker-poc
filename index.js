const express = require('express')
const MongoClient = require('mongodb').MongoClient

const getData = () => {
  return new Promise(function(resolve, reject) {
    // note: the url for the mongodb server (here: odm-mongo) is the name of the service
    // as defined in docker-compose.yml
    MongoClient.connect('mongodb://odm-mongo:27017/test', { useNewUrlParser: true }, function (err, client) {
      if (err) return reject(err)
      const db = client.db('test')
      db.collection("family").find().toArray( function(err, docs) {
        if (err) return reject(err)
        // Resolve (or fulfill) the promise with data
        return resolve(docs)
      })
    })
  })
}

const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  getData()
    .then(data => res.send(data))
    .catch(err => next(err))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))