const mongoose = require('mongoose');
const user = require("./secret.key")
const mongoDB = `mongodb+srv://${user.username}:${user.password}@cluster0-iwb70.gcp.mongodb.net/example-todo?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;