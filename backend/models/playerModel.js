import mongoose, { Schema } from 'mongoose';

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  strength: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  speed: {
    type: Number,
    enum: [10, 15, 20, 25, 30]
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Player', playerSchema);
