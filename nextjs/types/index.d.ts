type User = {
  id: string;
  firstName: string;
  lastName: string;
  role:
    | { type: "dean"; school: string }
    | { type: "dept_head"; dept: string }
    | { type: "instructor" }
    | { type: "student" };
};
