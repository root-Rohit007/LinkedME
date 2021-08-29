const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
//Creating user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  resetToken: String,

  expireToken: Date,

  pic: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBlcnNvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },

  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

mongoose.model("User", userSchema);
