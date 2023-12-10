type User = {
  id: string;
  firstName: string;
  lastName: string;
  role:
    | { type: "dean"; school: string; schoolName: string }
    | { type: "dept_head"; dept: string; deptName: string }
    | { type: "instructor" }
    | { type: "student" };
};
