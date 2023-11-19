import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
  title: String,
  code: String,
  head: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
  school: { type: mongoose.SchemaTypes.ObjectId, ref: "School" },
});

export default mongoose.models.Dept || mongoose.model("Dept", deptSchema);
