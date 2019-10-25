const mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
  userID: {
    type: String,
    trim: true,
    required: true
  },
  title: {
    type: String,
    trim: true,
    required: true
  },
  priority: {
    type: Number,
    trim: true,
    required: true
  },
  type: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
