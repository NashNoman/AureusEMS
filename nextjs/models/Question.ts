import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    id: String,
    text: String,
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
    topic: String,
    btl: Number,
    type: String,
    chapter: String,
    correctAnswer: [String],
    error: String,
    taken: Boolean,
    locked: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
    options: [optionSchema],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  }
);

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
