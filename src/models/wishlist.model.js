import { Schema, model } from 'mongoose';

const wishlishSchema = new Schema(
  {
    UserID:{
      type:String
  },
  User_Email: {
    type: String
  },
   BookID:{
              type:String
          },
          BookName: {
            type: String,
          },
          Price:{
              type:Number
          },
          image: {
            type: String
          }
  },
  {
    timestamps: true
  }
);

export default model('WishList', wishlishSchema);