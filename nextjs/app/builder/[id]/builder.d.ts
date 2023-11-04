type Section = {
  type: string;
  sectionGrade: number;
  sectionPercentage: number;
};

type Choice = { id: string; text: string };

type MCQ = {
  id: number;
  type: "mcq";
  btLevel: number | null;
  text: string;
  choices: Choice[];
  answer: string;
};

type MCQSection = {
  order: number[];
  questions: MCQ[];
};

type ToFQ = {
  id: number;
  type: "tof";
  btLevel: number | null;
  text: string;
  answer: 1 | 0;
};

type ToFSection = {
  order: number[];
  questions: ToFQ[];
};

type ExamInfo = {
  courseTitle: string;
  courseCode: string;
  examId: number;
  examPercentage: number;
  examType: string;
  sections: Section[];
};

type Exam = {
  examInfo: ExamInfo;
  mcq?: MCQSection;
  tof?: ToFSection;
};

type RootState = Exam;
