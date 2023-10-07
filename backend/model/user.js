const {
 Schema,
 model
} = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const userSchema = new Schema({
 name: String,
 email: {
  type: String,
  unique: true,
 },
 phoneNumber: String,
 role: {
  type: String,
  default: 'admin'
 },
 password: String
}, {
 timestamps: true
})

userSchema.pre("save", function (next, option) {
 const pass = this.password;
 if (pass) this.password = bcrypt.hashSync(pass, salt);
 next()
})

module.exports =  model("user", userSchema);