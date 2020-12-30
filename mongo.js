const mongoose = require("mongoose");

const mongoPath =
  "mongodb+srv://Arts:rGV4xKKMHRkICcNt@sabermongodb.42jay.mongodb.net/Saber?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
