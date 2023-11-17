import { createSlice } from "@reduxjs/toolkit";

const examInfoSlice = createSlice({
  initialState: {
    courseTitle: "Introduction to Computers",
    courseCode: "CSCI100",
    examId: 123,
    examPercentage: 10,
    examType: "Test1",
    sections: [
      // { type: "mcq", sectionPercentage: 5 },
      // { type: "tof", sectionPercentage: 5 },
    ],
  },
  name: "examInfoInfo",
  reducers: {},
});

export const examInfoActions = examInfoSlice.actions;

export default examInfoSlice;
