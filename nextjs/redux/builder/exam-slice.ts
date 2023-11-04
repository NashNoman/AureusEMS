import { createSlice } from "@reduxjs/toolkit";

const examInfoSlice = createSlice({
  initialState: {
    courseTitle: "",
    courseCode: "",
    examId: null,
    examPercentage: null,
    examType: "",
    sections: [],
  },
  name: "examInfoInfo",
  reducers: {},
});

export const examInfoActions = examInfoSlice.actions;

export default examInfoSlice;
