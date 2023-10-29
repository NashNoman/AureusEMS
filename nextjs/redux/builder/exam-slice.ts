import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  initialState: {
    courseTitle: "Introduction to Computers",
    courseCode: "CSCI100",
    examId: 123,
    examPercentage: 10,
    examType: "test",
    sections: ["scq", "tof"],
  },
  name: "examInfo",
  reducers: {},
});

export const examActions = examSlice.actions;

export default examSlice;
