import mongoose, { Schema } from "mongoose";

const chatSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      users: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          admin: {
            type: Boolean,
            default: false,
          }
        }
      ],
    },
    {
      timestamps: true,
      collection: "chats",
    }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;