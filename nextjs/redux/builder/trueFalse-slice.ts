import { createSlice } from "@reduxjs/toolkit";

const trueFalseSlice = createSlice({
  initialState: {
    sectionType: "tof",
    sectionGrade: 50,
    questions: [
      {
        id: 123,
        qType: "tof",
        btLevel: 1,
        text: "CPU stands for Central Processing Unit",
        answer: 1,
      },
      {
        id: 321,
        qType: "tof",
        btLevel: 2,
        text: "Webcam is a type of output device.",
        answer: 0,
      },
      {
        id: 45,
        qType: "tof",
        btLevel: 2,
        text: "Webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device.",
        answer: 0,
      },
      {
        id: 32,
        qType: "tof",
        btLevel: 1,
        text: "A computer only understands binary language",
        answer: 1,
      },
    ],
  },
  name: "trueFalse",
  reducers: {
    setQuestion(state, action) {
      const { id } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      question!.text = action.payload.text;
    },
    setAnswer(state, action) {
      const { id } = action.payload;
      const question = state.questions.find((q) => q.id === id);
      question!.answer = action.payload.answer;
    },
  },
});

export const trueFalseActions = trueFalseSlice.actions;

export default trueFalseSlice;
