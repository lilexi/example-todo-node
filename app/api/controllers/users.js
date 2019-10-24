const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function(req, res, next) {
    // console.log("\n", req.body);
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) {
        next(err);
      } else {
        if (userInfo === null) {
          userModel.create(
            {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              level: 1,
              exp: 0
            },
            (err, result) => {
              if (err) next(err);
              else
                res.json({
                  status: "Success",
                  message: "User added successfully!",
                  data: {
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    level: result.level,
                    exp: result.exp,
                    status: 200
                  }
                });
            }
          );
        } else if (req.body.email === userInfo.email) {
          res.json({
            status: "Error",
            message: "A user with such email already exist!",
            data: { status: 500 }
          });
        }
      }
    });
  },

  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (userInfo !== null) {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign(
              { id: userInfo._id },
              req.app.get("secretKey"),
              { expiresIn: "1h" }
            );
            res.json({
              status: "Success",
              message: "User found!",
              data: { user: userInfo, token: token, status: 200 }
            });
          }
        } else {
          res.json({
            status: "Error",
            message: "Invalid email/password!",
            data: { status: 500 }
          });
        }
      }
    });
  },

  verify: function (req, res, next) {
    userModel.findOne({_id: req.body.userId}, (err, userInfo) => {
      if (err) next(err);
      else {
        if (userInfo !== null) {
          res.json({data: userInfo})
        } else {
          res.json({status: "Error", message: "Invalid token", verify: false})
        }
      }
    })
  }
};
