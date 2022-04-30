const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PhoneRegSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  date_of_confirmation: {
    type: Date,
    required: true,
  },
});

// PhoneRegSchema.virtual("phone")
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// methods
PhoneRegSchema.methods = {
  // encryptPassword: function (password) {
  //     try {
  //         return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  //     } catch (error) {
  //         console.error(error);
  //         process.exit(1);
  //     }
  // },
  // makeSalt: function () {
  //     return Math.round(new Date().valueOf() * Math.random()) + '';
  // },
  // authenticate: function (password) {
  //     return this.encryptPassword(password) === this.hashed_password;
  // }
};

const PhoneModel = mongoose.model("phone-register", PhoneRegSchema);

module.exports = PhoneModel;
