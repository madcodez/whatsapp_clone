import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
});

export default mongoose.model("roomContents", roomSchema);
