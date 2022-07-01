const Employe = require("../models/employeModel");
const mongoose = require("mongoose");

// get all employes
const getEmployes = async (req, res) => {
  const employes = await Employe.find({}).sort({ createdAt: -1 });

  res.status(200).json(employes);
};

// get a single employe
const getEmploye = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employe" });
  }

  const employe = await Employe.findById(id);

  if (!employe) {
    return res.status(404).json({ error: "No such employe" });
  }

  res.status(200).json(employe);
};

// create a new employe
const createEmploye = async (req, res) => {
  const { name, designation, age, salary } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!designation) {
    emptyFields.push("designation");
  }
  if (!age) {
    emptyFields.push("age");
  }
  if (!salary) {
    emptyFields.push("salary");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const employe = await Employe.create({ name, designation, age, salary });
    res.status(200).json(employe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a employe
const deleteEmploye = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employe" });
  }

  const employe = await Employe.findOneAndDelete({ _id: id });

  if (!employe) {
    return res.status(400).json({ error: "No such employe" });
  }

  res.status(200).json(employe);
};

// update a employe
const updateEmploye = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employe" });
  }

  const employe = await Employe.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!employe) {
    return res.status(400).json({ error: "No such employe" });
  }

  res.status(200).json(employe);
};

module.exports = {
  getEmployes,
  getEmploye,
  createEmploye,
  deleteEmploye,
  updateEmploye,
};
