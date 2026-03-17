const Grade = require("../models/grade.model");
const { getDBPath, readDB, writeDB } = require("../services/file.service");

// Grade Controllers

const key = "grade";
const DBPath = getDBPath(key) 

//Get all grades
const getAllGrades = async (req, res) => {
  const grades = await readDB(DBPath);
  return res.json(grades).send();
};

//Get grade by id
const getGradeById = async (req, res) => {
  const id = req.params.id;
  const grades = await readDB(DBPath);
  const grade = grades.find((g) => g.no === parseInt(id));
  return res.json(grade).send();
};

//Create a new grade
const createGrade = async (req, res) => {
  const { name, code, number, note } = req.body;
  const grades = await readDB(DBPath);
  const newGrade = new Grade(grades.length + 1, name, code, number, note);
  grades.push(newGrade);
  writeDB(DBPath,grades);
  return res.status(201).json(newGrade).send();
};

const updateGrade = async (req, res) => {
  const id = req.params.id;
  const { name, code, number, note } = req.body;
  const grades = await readDB(DBPath);
  const gradeIndex = grades.findIndex((g) => g.no === parseInt(id));
  if (gradeIndex === -1) {
    return res.status(404).json({ message: "Grade not found" });
  }
  grades[gradeIndex] = { no: gradeIndex, name, code, number, note };
  writeDB(DBPath,grades);
  return res.status(200).json(grades[gradeIndex]).send();
};

const deleteGrade = async (req, res) => {
  const id = req.params.id;
  const grades = await readDB(DBPath);
  const gradeIndex = grades.findIndex((g) => g.no === parseInt(id));
  if (gradeIndex === -1) {
    return res.status(404).json({ message: "Grade not found" });
  }
  grades.splice(gradeIndex, 1);
  writeDB(DBPath,grades);
  return res.status(204).send();
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};
