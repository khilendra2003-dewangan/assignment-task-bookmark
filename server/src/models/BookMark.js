import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const BookMark = mongoose.model("BOOKMARK", bookmarkSchema);
export default BookMark;
