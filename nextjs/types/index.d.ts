type Roles = {
  dean: "dean";
  dept_head: "dept_head";
  instructor: "instructor";
  student: "student";
};

type User = {
  id: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role:
    | { type: "dean"; school: string; schoolName: string }
    | { type: "dept_head"; dept: string; deptName: string }
    | { type: "instructor" }
    | { type: "student" };
};

type Topic = {
  highest: number;
  topic: string;
  levels: number[];
};

type LearningObjective = {
  text: string;
  error: string;
};

type CLO = {
  _id: string;
  los: string[];
  topics: Topic[];
  highest: number;
};

type Notifi = {
  id: string;
  title: string;
  body: string;
  type: string;
  link: string;
  seen: boolean;
  created: string;
  from: string;
};
