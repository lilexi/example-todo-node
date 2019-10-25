const express = require("express");
const router = express.Router();
const TodoController = require("../app/api/controllers/todos");

router.post("/getAllTodo", TodoController.getAllTodo);
router.post("/add", TodoController.addTodo);
// router.post("/delete", TodoController.deleteTodo);
// router.post("/change", TodoController.changeTodo);

module.exports = router;
