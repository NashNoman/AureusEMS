const examData = {
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
            { A: "Computer Processing Unit" },
            { B: "Central Processing Unit" },
            { C: "Control Processing Unit" },
            { D: "Computing Processing Unit" },
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
              A: "Computer is a machine or device that can be programmed to perform arithmetical or logic operation sequences automatically",
            },
            {
              B: "Computer understands only binary language which is written in the form of 0s & 1s",
            },
            {
              C: "Computer is a programmable electronic device that stores, retrieves, and processes the data",
            },
            { D: "All of the mentioned" },
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
            { A: "Computer understands only C Language" },
            { B: "Computer understands only Assembly Language" },
            { C: "Computer understands only Binary Language" },
            { D: "Computer understands only BASIC" },
          ],
          answer: "C",
        },
      ],
    },
  ],
};

export default examData;
