import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
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
    phone: {
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