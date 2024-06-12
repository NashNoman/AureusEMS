import CourseLearningObjectives from "@/app/(main)/courses/[code]/CourseLearningObjects";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { dbConnect } from "@/lib/db";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Courses - Aureus",
};

// const course = {
//   code: "CSCI335",
//   title: "Database Systems",
//   clos: null,
//   instructor: {
//     firstName: "Assem",
//     middleName: "Mohammed",
//     lastName: "Al-Maqtari",
//   },
//   schedule: {
//     days: ["Mon", "Wed", "Sat"],
//     startTime: "10:00",
//     endTime: "11:30",
//   },
// };

export default async function page({ params }: { params: { code: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) notFound();

  const { user } = session;

  await dbConnect();

  const course = await Course.findOne({ code: params.code }).populate(
    "instructor"
  );

  if (
    user.role.type === "dept_head" &&
    course.dept.toString() !== user.role.dept
  )
    notFound();

  const { instructor } = course;

  const days = course.schedule.days.map((day: any) => day[0]).join("");

  const { startTime, endTime } = course.schedule;

  return (
    <ScrollArea>
      <div className="px-16 overflow-y-auto pb-16">
        <div className="flex items-baseline">
          <h1 className="mx-4 text-4xl">{course.title}</h1>
          <p className="text-sm text-primary/60">
            {days} ({startTime}-{endTime})
          </p>
        </div>
        <h2 className="mx-4 text-2xl">{course.code}</h2>
        <p className="mx-4 text-sm text-primary/60">
          {instructor.firstName} {instructor.middleName[0]}.{" "}
          {instructor.lastName}
        </p>
        <Separator className="mt-5 mb-6" />
        <div className="p-4 overflow-hidden">
          <h4 className="text-secondary-foreground mb-4">
            Course Learning Objectives
          </h4>
          <CourseLearningObjectives
            closId={course.clos && course.clos.toString()}
            courseId={course._id.toString()}
            instructorId={instructor._id.toString()}
          />
        </div>
      </div>
    </ScrollArea>
  );
}
