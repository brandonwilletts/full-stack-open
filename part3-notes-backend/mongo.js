const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://brandonwilletts:${password}@cluster0.qt70dcd.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

// Schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Model
const Note = mongoose.model("Note", noteSchema);

// Creates a Note object using the Note model
const note = new Note({
  content: "Mongoose makes things easy",
  important: true,
});

// Saves the new Note object to the database
// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// Fetches notes from the database
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
