const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employe", employeSchema);
