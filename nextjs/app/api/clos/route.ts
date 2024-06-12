import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CLO from "@/models/CLO";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return new Response("unauthorized", { status: 401 });

  const url = new URL(req.url);

  const { searchParams } = url;

  const id = searchParams.get("id") as string;

  const clos = await CLO.findById(id).populate({
    path: "course",
    model: Course,
    populate: "dept",
  });

  if (!clos) return new Response("not found", { status: 404 });

  const { user } = session;

  const { course } = clos;

  if (
    (user.role.type === "dean" &&
      course.dept.school.toString() !== user.role.school) ||
    (user.role.type === "dept_head" &&
      course.dept._id.toString() !== user.role.dept)
  )
    return new Response("unauthorized", { status: 401 });

  return Response.json(clos);
}
