type SectionInfo = {
  type: string;
  sectionGrade: number;
};

type ExamInfo = {
  examId: number;
  courseTitle: string;
  courseCode: string;
  examPercentage: number;
  examType: string;
  sectionsInfo: SectionInfo[];
};

type Choice = {
  id: string;
  text: string;
};

type MCQ = {
  id: number;
  type: "mcq";
  btLevel: number;
  text: string;
  choices: Choice[];
  answer: string;
};

type TOF = {
  id: number;
  type: "tof";
  btLevel: number;
  text: string;
  answer: number;
};

type BuilderRS = {
  examInfo: ExamInfo;
  mcq: MCQ[];
  tof: TOF[];
};
