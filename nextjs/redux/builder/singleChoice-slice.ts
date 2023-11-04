import { createSlice } from "@reduxjs/toolkit";

const mcqSlice = createSlice({
  initialState: {
    order: [37, 65, 19],
    questions: [
      {
        id: 19,
        type: "sc",
        btLevel: 1,
        text: "What does 'CPU' stand for?",
        choices: [
          { id: "A", text: "Computer Processing Unit" },
          { id: "B", text: "Central Processing Unit" },
          { id: "C", text: "Control Processing Unit" },
          { id: "D", text: "Computing Processing Unit" },
        ],
        answer: "B",
      },
      {
        id: 37,
        type: "sc",
        btLevel: 2,
        text: "Which of the following is the correct definition of Computer?",
        choices: [
          {
            id: "A",
            text: "Computer is a machine or device that can be programmed to perform arithmetical or logic operation sequences automatically",
          },
          {
            id: "B",
            text: "Computer understands only binary language which is written in the form of 0s & 1s",
          },
          {
            id: "C",
            text: "Computer is a programmable electronic device that stores, retrieves, and processes the data",
          },
          { id: "D", text: "All of the mentioned" },
        ],
        answer: "D",
      },
      {
        id: 65,
        type: "sc",
        btLevel: 1,
        text: "Which of the following language does the computer understand:",
        choices: [
          { id: "A", text: "Computer understands only C Language" },
          { id: "B", text: "Computer understands only Assembly Language" },
          { id: "C", text: "Computer understands only Binary Language" },
          { id: "D", text: "Computer understands only BASIC" },
        ],
        answer: "C",
      },
    ],
  },
  name: "mcq",
  reducers: {
    updateQuestion(state, action) {
      const { id, newQuestion } = action.payload;
      const oldQuestionIndex = state.questions.findIndex((q) => q.id === id);
      const oldQuestion = state.questions[oldQuestionIndex];
      state.questions[oldQuestionIndex] = Object.assign(
        oldQuestion,
        newQuestion
      );
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
  },
});

export const mcqActions = mcqSlice.actions;

export default mcqSlice;
