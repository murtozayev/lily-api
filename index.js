import express from "express"
import { connectDB } from "./db/connectDB.js"
import dotenv from "dotenv"
import { CAKE } from "./model/cake.model.js"
import { Faq } from "./model/faq.model.js"
import cors from "cors"
const app = express()

app.use(cors({ origin: "http://localhost:1420/" }))

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.post("/postcake", async (req, res) => {
    try {
        const { name, price, image, desc, category, categoryImage } = req.body;
        const newCake = await CAKE.create({ name, price, image, desc, category, categoryImage });
        res.json(newCake);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create cake" });
    }
});


app.get("/getcake", async (req, res) => {
    try {
        const cakes = await CAKE.find({})

        if (!cakes) {
            throw new Error("There is no cake")
        }

        res.json(cakes)

    } catch (error) {

    }
})

app.post("/postfaq", async (req, res) => {
    const { question, answer } = req.body

    try {
        const newFaq = await Faq.create({ question, answer })

        res.json(newFaq)
    } catch (error) {
        console.log(error);
    }

})

app.get("/getfaq", async (req, res) => {
    try {
        const faqs = await Faq.find({})

        res.json(faqs)
    } catch (error) {
        console.log(error);

    }
})

app.delete("/killproduct/:id", async (req, res) => {
    const { id } = req.params

    try {
        await CAKE.findByIdAndDelete(id)
        await res.json("Product removed")
    } catch (error) {
        console.log(error);
    }

})

app.delete("/killfaq/:id", async (req, res) => {
    const { id } = req.params

    try {
        await Faq.findByIdAndDelete(id)
        await res.json("Faq removed")
    } catch (error) {
        console.log(error);
    }

})

app.put("/updateproduct/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatecake = await CAKE.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatecake) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatecake);
    } catch (error) {
        console.error("Error updating product:", error); // Xatolikni chop qilish
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/updatefaq/:id", async (req, res) => {
    const { id } = req.params

    const updateFAQ = req.body

    try {
        const updatedfaq = await Faq.findByIdAndUpdate(id, updateFAQ, { new: true })

        if (!updatedfaq) {
            res.status(500).json("Cannot update")
        }

        res.json(updatedfaq)
    } catch (error) {
        throw new Error(error)
    }
})


connectDB()

export default app