type SC = { id: number; text: string };

type SCQuestion = {
  id: number;
  qType: "scq";
  btLevel: number;
  question: string;
  choices: SC[];
  answer: string;
};

type ToFQuestion = {
  id: number;
  qType: "tof";
  btlLevel: number;
  question: string;
  answer: 1 | 0;
};
