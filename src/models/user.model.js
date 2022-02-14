import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role:{
      type:String,
      trim:true
     }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);