import BankCard from "@/app/(main)/bank/BankCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Separator } from "@/components/ui/separator";
import { dbConnect } from "@/lib/db";
import Bank from "@/models/Bank";
import Course from "@/models/Course";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Bank - Aureus",
};

export default async function page() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  let courses = await Course.find(
    { instructor: user.id },
    { code: 1, title: 1, _id: 1, clos: 1 }
  ).sort({ code: 1 });

  const banks = await Bank.aggregate([
    {
      $match: {
        course: {
          $in: courses.map((course) => course._id),
        },
      },
    },
    {
      $lookup: {
        from: "questions", // replace with your actual questions collection name
        localField: "questions",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $project: {
        course: 1,
        mcqCount: {
          $size: {
            $filter: {
              input: "$questions",
              as: "question",
              cond: { $eq: ["$$question.type", "mcq"] },
            },
          },
        },
        trueFalseCount: {
          $size: {
            $filter: {
              input: "$questions",
              as: "question",
              cond: { $eq: ["$$question.type", "trueFalse"] },
            },
          },
        },
        directCount: {
          $size: {
            $filter: {
              input: "$questions",
              as: "question",
              cond: { $eq: ["$$question.type", "direct"] },
            },
          },
        },
        totalCount: {
          $size: "$questions",
        },
      },
    },
  ]);

  courses = courses.map((course) => {
    const courseBank = banks.find(
      (bank) => bank.course.toString() === course._id.toString()
    );

    if (!courseBank) return course;

    return {
      ...course.toObject(),
      bank: courseBank,
    };
  });

  return (
    <div>
      <h1 className="ml-20 mb-14">Your Question Banks</h1>
      <Separator className="my-5" />
      <div className="mx-20 gap-4 mt-8 grid grid-cols-2">
        {courses.map((course) => {
          return <BankCard key={course._id} course={course} />;
        })}
      </div>
    </div>
  );
}
