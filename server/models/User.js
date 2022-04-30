const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    }
});

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function () {
        return this._password;
    })

// methods
UserSchema.methods = {
    encryptPassword: function (password) {
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    },
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    },
    authenticate: function (password) {
        return this.encryptPassword(password) === this.hashed_password;
    }
}


const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;