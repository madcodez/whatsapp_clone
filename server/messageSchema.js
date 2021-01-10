import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  name: String,
  message: String,
  timeStamp: String,
  received: Boolean,
});

export default mongoose.model("messageContents", messageSchema);
