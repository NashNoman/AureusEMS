import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  title: String,
  dean: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  depts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Dept" }],
});

export default mongoose.models.School || mongoose.model("School", schoolSchema);
