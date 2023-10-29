const examData: ExamData = {
  courseTitle: "Introduction to Computers",
  courseCode: "CSCI100",
  examId: 123,
  examPercentage: 10,
  examType: "test",
  sections: [
    {
      sectionType: "scq",
      sectionGrade: 50,
      questions: [
        {
          id: 19,
          qType: "sc",
          btLevel: 1,
          question: "What does 'CPU' stand for?",
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
          qType: "sc",
          btLevel: 2,
          question:
            "Which of the following is the correct definition of Computer?",
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
          qType: "sc",
          btLevel: 1,
          question:
            "Which of the following language does the computer understand:",
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
    {
      sectionType: "tof",
      sectionGrade: 50,
      questions: [
        {
          id: 123,
          qType: "tof",
          btLevel: 1,
          question: "CPU stands for Central Processing Unit",
          answer: 1,
        },
        {
          id: 321,
          qType: "tof",
          btLevel: 2,
          question: "Webcam is a type of output device.",
          answer: 0,
        },
        {
          id: 45,
          qType: "tof",
          btLevel: 2,
          question:
            "Webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device webcam is a type of input device.",
          answer: 0,
        },
        {
          id: 32,
          qType: "tof",
          btLevel: 1,
          question: "A computer only understands binary language",
          answer: 1,
        },
      ],
    },
  ],
};

export default examData;
