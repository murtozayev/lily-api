import { connect } from "mongoose"

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL)
        console.log("Mongo db is connected");
    } catch (error) {
        console.log(error);
    }
}