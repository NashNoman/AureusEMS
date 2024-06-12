import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Course from "@/models/Course";
import Exam from "@/models/Exam";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role?.type === "student") {
    return new Response("unauthorized", { status: 401 });
  }

  const courses = await Course.find({ instructor: session.user.id })
    .populate("exams.doc", Exam)
    .sort([
      ["clos", -1],
      ["code", -1],
    ]);

  if (!courses) {
    return new Response("not found", { status: 404 });
  }

  return Response.json(courses);
}
