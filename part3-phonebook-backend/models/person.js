const mongoose = require("mongoose");

// Connect to MongoDB database via Mongoose
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("connecting to MongoDB...");
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//Creates a data schema for Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-[0-9]+$/.test(v);
      },
      message: "Invalid phone number format",
    },
    required: true,
  },
});

// Modifies the Person objects returned by Mongoose
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
