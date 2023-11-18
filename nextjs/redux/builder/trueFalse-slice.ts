import { createSlice } from "@reduxjs/toolkit";

const tofSlice = createSlice({
  name: "tof",
  initialState: {
    type: "tof",
    sectionGrade: 5,
    questions: [
      {
        id: 123,
        type: "tof",
        btLevel: 1,
        text: "CPU stands for Central Processing Unit",
        answer: 1,
      },
      {
        id: 321,
        type: "tof",
        btLevel: 2,
        text: "Webcam is a type of output device.",
        answer: 0,
      },
      {
        id: 45,
        type: "tof",
        btLevel: 2,
        text: "Webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device.",
        answer: 0,
      },
      {
        id: 32,
        type: "tof",
        btLevel: 1,
        text: "A computer only understands binary language",
        answer: 1,
      },
    ],
  },
  reducers: {
    // updateQuestion(state, action) {
    //   const { id, newQuestion } = action.payload;
    //   const questionIndex = state.findIndex((q) => q.id === id);
    //   const question = state[questionIndex];
    //   state[questionIndex] = Object.assign(question, newQuestion);
    // },
  },
});

export const tofActions = tofSlice.actions;

export default tofSlice;
