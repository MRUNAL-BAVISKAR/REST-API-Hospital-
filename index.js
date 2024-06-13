const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let patients = [
  {
    id: uuidv4(),
    name: "John Doe",
    age: 35,
    city: "New York",
    problem: "I have a problem of taking breath",
  },
  {
    id: uuidv4(),
    name: "Alice Smith",
    age: 28,
    city: "Los Angeles",
    problem: "I have stomach ache",
  },
  {
    id: uuidv4(),
    name: "Michael Johnson",
    age: 45,
    city: "Chicago",
    problem: "I have headache",
  },
  {
    id: uuidv4(),
    name: "Emily Brown",
    age: 50,
    city: "Houston",
    problem: "I have cold, cough.",
  },
  {
    id: uuidv4(),
    name: "David Martinez",
    age: 40,
    city: "Miami",
    problem: "I have a problem of lossing hairs from my body",
  }
];
app.get("/patients", (req, res) => {
  res.render("index.ejs", { patients });
});
app.get("/patients/new", (req, res) => {
  res.render("new_form.ejs");
});
app.post("/patients", (req, res) => {
  let { name, age, city, problem } = req.body;
  let id = uuidv4();
  patients.push({ id, name, age, city, problem });
  res.redirect("/patients");
});
app.get("/patients/:id", (req, res) => {
  let { id } = req.params;
  let patient = patients.find((p) => id === p.id);
  res.render("detail.ejs", { patient });
});
app.patch("/patients/:id", (req, res) => {
  let { id } = req.params;
  let newProblem = req.body.problem;
  let patient = patients.find((p) => id === p.id);
  patient.problem = newProblem;
  console.log(patient);
  res.redirect("/patients");
});
app.get("/patients/:id/edit", (req, res) => {
  let { id } = req.params;
  let patient = patients.find((p) => id === p.id);
  res.render("edit.ejs", { patient });
});
app.delete("/patients/:id", (req, res) => {
  let { id } = req.params;
  console.log("Deleting patient with ID:", id);
  patients = patients.filter((p) => id !== p.id);
  console.log("Updated patients array:", patients);
  res.redirect("/patients");
});
app.listen(port, () => {
  console.log("Port is Listening");
});
