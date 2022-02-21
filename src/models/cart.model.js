import { Schema, model } from "mongoose";
const cartSchema = new Schema({
    UserID: {
        type: String
    },
    BookID: {
        type: String
    },
    Quantity: {
        type: Number
    },
    Prices: {
        type: Number
    },
    isPurched: {
        type: Boolean,
        default: false
    },
    TotalAmount: {
        type: Number
    }

})
export default model('Cart', cartSchema);