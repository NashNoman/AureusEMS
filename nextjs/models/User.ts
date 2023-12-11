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

// export default mongoose.models.User || mongoose.model("User", userSchema);

const options = { discriminatorKey: "role" };

const userSchema = new mongoose.Schema(
  {
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
    courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }],
  },
  options
);

const instructorSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
  },
  options
);

const studentSchema = new mongoose.Schema(
  {
    major: { type: String },
  },
  options
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Instructor =
  mongoose.models.Instructor ||
  User.discriminator("Instructor", instructorSchema, "instructor");

export const Student =
  mongoose.models.Student ||
  User.discriminator("Student", studentSchema, "student");
