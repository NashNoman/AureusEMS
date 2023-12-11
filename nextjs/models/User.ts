import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   firstName: { type: String, required: true },
//   middleName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   role: {
//     type: String,
//     enum: {
//       values: ["dean", "dept_head", "instructor", "student"],
//       message: "{VALUE} is not supported",
//     },
//     required: true,
//   },
//   password: String,
//   courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
// });

const options = { discriminatorKey: "role" };

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ["dean", "dept_head", "instructor", "student"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  password: { type: String, required: true },
  major: { type: String },
  courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
