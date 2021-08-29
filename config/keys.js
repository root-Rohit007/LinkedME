// module.exports = {
//   MONGOURI:
//     "mongodb+srv://dbUser:d5581uIT8zn29IES@cluster0.e2ypo.mongodb.net/<Social>?retryWrites=true&w=majority",
//   JWTSEC: "asdfghjkl",
// };

if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
