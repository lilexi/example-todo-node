const express = require("express");
const logger = require("morgan");
const users = require("./routes/users");
const todos = require("./routes/todos");
const bodyParser = require("body-parser");
const mongoose = require("./config/db.connected"); //database configuration
var jwt = require("jsonwebtoken");
var cors = require("cors");
const app = express();
app.use(cors());
app.set("secretKey", "nodeRestApi"); // jwt secret token

// connection to mongodb
mongoose.connection.on(
  "error",
  console.error.bind(console, "[ 📛 ] MongoDB connection error:")
);
mongoose.connection.once("open", function() {
  console.log("[ ✅  ] Mongodb: connected");
});

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.json({ "": "" });
});

// public route
app.use("/users", users);

// private route
app.use("/home", validateUser, users);
app.use("/todo", validateUser, todos);

function validateUser(req, res, next) {
  jwt.verify(req.body.token, req.app.get("secretKey"), function(err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: "" });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// handle 404 error
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// handle errors
app.use(function(err, req, res) {
  console.log(err);
  console.log(req.body);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !" });
});

app.listen(3001, function() {
  console.log("[ 🌐  ] Started at localhost:3001");
});
