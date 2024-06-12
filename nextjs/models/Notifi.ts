import mongoose from "mongoose";

const notifiSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    urgent: Boolean,
    type: String,
    link: String,
    seen: Boolean,
    questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Question" }],
    created: { type: Date, default: Date.now },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    from: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
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

export default mongoose.models.Notifi || mongoose.model("Notifi", notifiSchema);
