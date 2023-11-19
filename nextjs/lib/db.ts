import mongoose from "mongoose";

const { MONGO_URL } = process.env;

if (!MONGO_URL) throw new Error("MONGO_URL is undefined");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

export const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(MONGO_URL);

  return cached.conn;
};
