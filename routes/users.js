const user = require('./dbConnected')
var express = require("express");
var router = express.Router();


/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

const MongoClient = require("mongodb").MongoClient;
const uri =
  `mongodb+srv://${user.username}:${user.password}@cluster0-iwb70.gcp.mongodb.net/test?retryWrites=true&w=majority`;

  console.log(uri);
const client = new MongoClient(
  uri,
  { useUnifiedTopology: true, useNewUrlParser: true },
);
client.connect(err => {
  if (err) {
    console.log(err);
  }
  const collection = client.db("example-todo").collection("users");
  console.log("[ ✅  ] Mongodb: connected");
  // perform actions on the collection object
  client.close();
});

module.exports = router;
