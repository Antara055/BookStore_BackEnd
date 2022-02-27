import { Schema, model } from 'mongoose';

const wishlishSchema = new Schema({
  UserID: {
    type: String
  },
  Book: [{
    BookID: {
      type: String
    },
    Prices: {
      type: Number
    },
    isPurched: {
      type: Boolean,
      default: false
    },
  }]

});

export default model('WishList', wishlishSchema);