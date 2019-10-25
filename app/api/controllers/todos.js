const TodoModel = require("../models/todo");

module.exports = {
  getAllTodo: (req, res, next) => {
    TodoModel.find(
      {
        userID: req.body.userId
      },
      (err, result) => {
        if (err) next(err);
        else {
          res.json({
            data: result
          });
        }
      }
    );
  },

  addTodo: (req, res, next) => {
    TodoModel.create(
      {
        userID: req.body.userId,
        title: req.body.title,
        priority: req.body.priority,
        type: req.body.type
      },
      err => {
        if (err) next(err);
        else {
          res.json({
            status: "Success",
            message: "Todo added successfully!",
            data: { status: "Success" }
          });
        }
      }
    );
  }

  // deleteTodo: 123,

  // changeTodo: 123
};
