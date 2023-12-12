import mongoose from "mongoose";

const examSectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["mcq", "tof", "essay"],
    },
    questions: [],
  },
  { _id: false }
);

const examSchema = new mongoose.Schema({
  type: String,
  course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  status: {
    type: String,
    enum: ["draft", "published", "taken"],
    default: "draft",
  },
  percentage: {
    type: Number,
    min: 5,
    max: 40,
  },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  due: Date,
  sections: [examSectionSchema],
});

export default mongoose.models.Exam || mongoose.model("Exam", examSchema);
