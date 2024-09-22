import { model, Schema } from "mongoose";

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

export const Faq = model('Faq', faqSchema);
