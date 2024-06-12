import CreateBankButton from "@/app/(main)/bank/CreateBankButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BankCard({ course }: { course: any }) {
  return (
    <Card
      className={cn(
        "mb-3 dark:bg-secondary/60 border-border flex",
        !course.clos && "text-primary/50 bg-secondary"
      )}
    >
      <div className="flex-grow">
        <CardHeader>
          <CardTitle>{course.code}</CardTitle>
          <CardDescription>{course.title}</CardDescription>
        </CardHeader>
        <CardContent>
          {course.clos ? (
            course.bank ? (
              <Link
                href={`bank/${course.bank._id}`}
                className="px-10 w-32 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90"
              >
                Open
              </Link>
            ) : (
              <CreateBankButton id={course._id.toString()} />
            )
          ) : (
            <p className="text-red-500 rounded-sm p-1 text-sm inline-block">
              Course Learning Objectives must be provided to create a question
              bank.
            </p>
          )}
        </CardContent>
      </div>
      {course.bank && (
        <div className="flex-grow-[2] my-6 px-6 border-l border-border">
          <p>
            <span className="font-semibold">Multiple Choices:</span>{" "}
            {course.bank.mcqCount}
          </p>
          <p>
            <span className="font-semibold">True or False:</span>{" "}
            {course.bank.trueFalseCount}
          </p>
          <p>
            <span className="font-semibold">Direct:</span>{" "}
            {course.bank.directCount}
          </p>
          <p>
            <span className="font-semibold">Total Questions:</span>{" "}
            {course.bank.totalCount}
          </p>
        </div>
      )}
    </Card>
  );
}
