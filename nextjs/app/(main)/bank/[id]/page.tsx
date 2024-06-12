import QuestionBank from "@/app/(main)/bank/[id]/QuestionBank";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/lib/db";
import Bank from "@/models/Bank";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Bank - Aureus",
};

export default async function page({ params }: { params: { id: string } }) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const bank = await Bank.findById(params.id, { course: 1 }).populate({
    path: "course",
    model: Course,
  });

  const { title, code } = bank.course;

  return (
    <>
      <QuestionBank bankId={params.id} courseTitle={title} courseCode={code} />
    </>
  );
}
