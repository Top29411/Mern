import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

// we trigger this function before saving a new user
// using an inline function here doesn't work
userSchema.pre('save', function (next) {
  // we get the current object
  let user = this;

  // Selecting a value below 10 does no harm to your user experience,
  // but someone attacking the password table would have an advantage
  // and might be able to scan for more common passwords in a given time.
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(user.password, salt, (error, hash) => {
      // we change the input user password with a hashed password
      user.password = hash;
      // continue the HTTP request
      next();
    });
  });
});

export default mongoose.model('User', userSchema);
