import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  type: {
    type: String,
    enum: {
      values: ["dean", "dept_head", "instructor", "student"],
      message: "{VALUE} is not supported",
    },
  },
  password: String,
  courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
