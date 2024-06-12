import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  { highest: Number, topic: String, levels: [Number], covering: [String] },
  { _id: false }
);

const closSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      unique: true,
    },
    los: [String],
    topics: [topicSchema],
    highest: Number,
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

export default mongoose.models.CLO || mongoose.model("CLO", closSchema);
