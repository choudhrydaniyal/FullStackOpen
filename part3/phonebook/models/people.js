const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
console.log("Connecting to ", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MondoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedobject) => {
    returnedobject.id = returnedobject._id.toString();
    delete returnedobject._id;
    delete returnedobject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
