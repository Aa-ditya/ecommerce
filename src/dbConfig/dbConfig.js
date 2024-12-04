import mongoose from "mongoose";

export async function Connect() {
    try {
        const mongo_uri = process.env.MONGO_URI;
        if (!mongo_uri) {
            console.log("uri is empty")
            return;
        }
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection
        connection.on("connected", () => {
            console.log("MongoDb successfully conncected")
        })
        connection.on("error", (err) => {
            console.log("Please ensure mongoose is correctly connected", err);
            process.exit();
        })
    }
    catch (err) {
        console.log("Something went wrong while connection to database", err);
    }
}