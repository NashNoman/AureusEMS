import mongoose from "mongoose";

// const mcqSchema = new mongoose.Schema(
//   {
//     question: String,
//     options: [String],
//     answer: Number,
//     topics: [String],
//     chapter: String,
//     notification: String,
//     covered: Boolean,

//     // for the future
//     // difficulty: Number,
//     // time: Number,
//     // hint: String,
//     // explanation: String,
//     // image: String,
//     // video: String,
//     // audio: String,
//   },
//   {
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id.toString();
//         delete ret._id;
//       },
//     },
//   }
// );

// const trueFalseSchema = new mongoose.Schema(
//   {
//     question: String,
//     answer: Boolean,
//     topics: [String],
//     chapter: String,
//     notification: String,
//     covered: Boolean,
//   },
//   {
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id.toString();
//         delete ret._id;
//       },
//     },
//   }
// );

// const openEndedSchema = new mongoose.Schema(
//   {
//     question: String,
//     answer: String,
//     topics: [String],
//     chapter: String,
//     notification: String,
//     covered: Boolean,
//   },
//   {
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id.toString();
//         delete ret._id;
//       },
//     },
//   }
// );

const bankSchema = new mongoose.Schema(
  {
    course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
    chapters: [String],
    questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Question" }],
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

export default mongoose.models.Bank || mongoose.model("Bank", bankSchema);
