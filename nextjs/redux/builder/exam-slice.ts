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
      { type: "mcq", sectionGrade: 5 },
      { type: "tof", sectionGrade: 5 },
    ],
  },
  reducers: {},
});

export const examInfoActions = examInfoSlice.actions;

export default examInfoSlice;
