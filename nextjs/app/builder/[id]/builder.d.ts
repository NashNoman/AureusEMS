type SC = { id: string; text: string };

interface SCQuestion {
  id: number;
  qType: string;
  btLevel: number | null;
  text: string;
  choices: SC[];
  answer: string;
}

class SCSection {
  sectionType: "scq";
  sectionGrade: number;
  questions: SCQuestion[];
}

interface ToFQuestion {
  id: number;
  qType: "tof";
  btLevel: number | null;
  text: string;
  answer: 1 | 0;
}

class ToFSection {
  sectionType: "tof";
  sectionGrade: number;
  questions: ToFQuestion[];
}

type Section = {
  sectionType: "scq" | "tof";
  sectionGrade: number;
  questions: SCQuestion[] | ToFQuestion[];
};

type ExamInfo = {
  courseTitle: string;
  courseCode: string;
  examId: number;
  examPercentage: number;
  examType: string;
  sections: string[];
};

type RootState = {
  exam: ExamInfo;
  singleChoice: SCSection;
  trueFalse: ToFSection;
};
