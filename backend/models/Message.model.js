import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat : {
      type : Schema.Types.ObjectId,
      ref : 'Chat',
      required : true
    },
    sender : {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type : {
      type : String,
      enum : ['text', 'image', 'video'],
      required : true
    },
    content : {
      type : String,
      required : true
    }
  },
  {
    timestamps: true,
    collection: "messages",
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;