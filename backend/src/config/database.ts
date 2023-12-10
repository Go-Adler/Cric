import mongoose from "mongoose"

mongoose.set("strictQuery", true)

export const mongo = async () => {
  try {
    const mongoURL = process.env.MONGO_URL!
    await mongoose.connect(mongoURL)

    console.log("Connected to mongo")
  } catch (error: any) {
    throw new Error(`Error: ${error.message}`)
  }
}
