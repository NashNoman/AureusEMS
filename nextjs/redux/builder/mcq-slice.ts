import { createSlice } from "@reduxjs/toolkit";

const mcqSlice = createSlice({
  initialState: [
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
        { id: "D", text: "All of the mentioned above" },
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
  name: "mcq",
  reducers: {
    updateQuestion(state, action) {
      const { id, newQuestion } = action.payload;
      const oldQuestionIndex = state.findIndex((q) => q.id === id);
      const oldQuestion = state[oldQuestionIndex];
      state[oldQuestionIndex] = Object.assign(oldQuestion, newQuestion);
    },
    updateChoice(state, action) {
      const { qid, id, text } = action.payload;
      const questionIndex = state.findIndex((q) => q.id === qid);
      const choiceIndex = state[questionIndex].choices.findIndex(
        (ch) => ch.id === id
      );
      state[questionIndex].choices[choiceIndex]!.text = text;
    },
    setAnswer(state, action) {
      const { qid, answer } = action.payload;
      const question = state.find((q) => q.id === qid);
      question!.answer = answer;
    },
    deleteQuestion(state, action) {
      const { num } = action.payload;
      state.splice(num, 1);
      console.log(state);
    },
    addQuestion(state) {
      const question = {
        id: Math.random(),
        btLevel: 0,
        type: "mcq",
        text: "",
        choices: [
          { id: "A", text: "" },
          { id: "B", text: "" },
          { id: "C", text: "" },
          { id: "D", text: "" },
        ],
        answer: "C",
      };
      state.push(question);
    },
  },
});

export const mcqActions = mcqSlice.actions;

export default mcqSlice;
