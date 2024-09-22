import { model, Schema } from "mongoose";

const cakeSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    categoryImage: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
})

export const CAKE = model("Cake", cakeSchema)