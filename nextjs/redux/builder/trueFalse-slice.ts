import { createSlice } from "@reduxjs/toolkit";

const tofSlice = createSlice({
  initialState: {
    order: [],
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
  name: "tof",
  reducers: {
    updateQuestion(state, action) {
      const { id, newQuestion } = action.payload;
      const questionIndex = state.questions.findIndex((q) => q.id === id);
      const question = state.questions[questionIndex];
      state.questions[questionIndex] = Object.assign(question, newQuestion);
    },
  },
});

export const tofActions = tofSlice.actions;

export default tofSlice;
