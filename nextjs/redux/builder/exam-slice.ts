import { createSlice } from "@reduxjs/toolkit";

const examInfoSlice = createSlice({
  name: "examInfo",
  initialState: {
    examId: 123,
    courseTitle: "Introduction to Computers",
    courseCode: "CSCI100",
    examPercentage: 10,
    examType: "Test1",
    sectionsInfo: [
      { type: "mcq", questionsNum: 3 },
      { type: "tof", questionsNum: 4 },
    ],
  },
  reducers: {},
});

export const examInfoActions = examInfoSlice.actions;

export default examInfoSlice;
