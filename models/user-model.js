const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^.+@.+\..+$/
  },
  encryptedPassword: { type: String, required: true },
  role: {
    type: String,
    enum: [ "normal", "author", "owner" ],
    default: "normal",
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);


module.exports = User;
