import mongoose from "mongoose";

const courseExamSchema = new mongoose.Schema({
  type: { type: String },
  percentage: {
    type: Number,
    min: 5,
    max: 40,
  },
  doc: { type: mongoose.SchemaTypes.ObjectId, ref: "Exam" },
});

const courseSchema = new mongoose.Schema(
  {
    title: String,
    code: String,
    clos: { type: mongoose.SchemaTypes.ObjectId, ref: "CLO" },
    dept: { type: mongoose.SchemaTypes.ObjectId, ref: "Dept" },
    instructor: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    bank: { type: mongoose.SchemaTypes.ObjectId, ref: "Bank" },
    exams: [courseExamSchema],
    schedule: {
      days: [String],
      startTime: String,
      endTime: String,
    },
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

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
