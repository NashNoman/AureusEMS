import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Bank from "@/models/Bank";
import CLO from "@/models/CLO";
import Course from "@/models/Course";
import Question from "@/models/Question";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id") as string;

  if (!session || !session.user) return null;

  const { user } = session;

  const bank = await Bank.findById(id, { questions: 1 })
    .populate("course")
    .populate({
      path: "questions",
      model: Question,
      options: { sort: { created: -1 } },
      match: { locked: false },
    });

  if (!bank || bank.course.instructor.toString() !== user.id)
    return new Response("Unauthorized", { status: 401 });

  return Response.json(bank);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id") as string;

  if (!session || !session.user) return null;

  const bank = await Bank.find({ course: id }, { chapters: 1, _id: 1 });

  return Response.json(bank);
}
