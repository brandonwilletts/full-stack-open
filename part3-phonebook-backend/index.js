require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

// Create custom token to be used to display request body
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

// Custom errorHandler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

// Allows Express to show static content (ie: frontend)
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
// Custom log for API requests via Morgan
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// GET Requests
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    response.send(
      `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
    );
  });
});

// DELETE Requests
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// PUT Requests
app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, {
    number: request.body.number,
  }).then((updatedPerson) => {
    response.json(updatedPerson);
  });
});

// POST Requests
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.use(errorHandler);

// Binds server to listen to HTTP requests sent to PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
