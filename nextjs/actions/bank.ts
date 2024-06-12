"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Bank from "@/models/Bank";
import CLO from "@/models/CLO";
import Course from "@/models/Course";
import Dept from "@/models/Dept";
import Notifi from "@/models/Notifi";
import Question from "@/models/Question";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBank(id: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  const course = await Course.findOne(
    { instructor: user.id, _id: id },
    { _id: 1 }
  );

  if (!course) return { error: "Course not found" };

  const bank = await Bank.create({ course: course._id, chapters: ["1"] });

  revalidatePath("/bank");
  redirect(`/bank/${bank._id}`);
}

export async function addQuestion(bankId: string, question: any) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  const bank = await Bank.findById(bankId).populate({
    path: "course",
    model: Course,
    populate: { path: "clos", model: CLO },
  });

  if (!bank || bank.course.instructor.toString() !== user.id)
    return { error: "Bank not found" };

  const { course } = bank;

  const res = await fetch(`http://127.0.0.1:5000/classify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question.question,
      type: question.type,
      clos: course.clos.topics,
    }),
  });

  const data = await res.json();

  let q: any;

  if (question.id && question.id !== "new") {
    q = await Question.findById(question.id);

    q.question = question.question;
    q.chapter = question.chapter;
    q.options = question.options;
    q.topic = question.topic;
    q.answer = question.answer;
    q.btl = data.btl;
    q.error = data.error;

    await q.save();

    if (question.error && !data.error) {
      const dept = await Dept.findOne({ _id: course.dept }, { head: 1 });

      const notifi = await Notifi.findOne({
        title: course.code,
        seen: false,
        user: dept.head,
      });

      if (notifi.questions.length === 1) {
        Notifi.findByIdAndDelete(notifi._id).exec();

        console.log("deleted");

        q = { ...q.toJSON(), dept_head: dept.head.toString() };
      } else {
        const index = notifi.questions.findIndex(
          (qu: any) => qu.id === question.id
        );
        delete notifi.questions[index];
        await notifi.save();
        q = { ...q.toJSON(), dept_head: dept.head.toString() };
      }
    }
  } else {
    q = await Question.create({ ...question, ...data });

    bank.questions.push(q._id);

    await bank.save();
  }

  if (data.error) {
    const dept = await Dept.findOne({ _id: course.dept }, { head: 1 });

    const notifi = await Notifi.findOne({
      title: course.code,
      seen: false,
      user: dept.head,
    });

    if (notifi) {
      if (!notifi.questions.find((qu: any) => qu.id === q.id)) {
        notifi.questions.push(q._id);
        await notifi.save();
      }
    } else {
      await Notifi.create({
        title: course.code,
        body: "misaligned questions have been added to the question bank.",
        type: "bank",
        urgent: true,
        seen: false,
        link: `/questions`,
        questions: [q._id],
        user: dept.head,
        from: course.instructor,
      });
    }

    return { ...q.toJSON(), dept_head: dept.head.toString() };
  }

  try {
    return q.toJSON();
  } catch (err) {
    return q;
  } finally {
    if (q.topic) {
      const index = course.clos.topics.findIndex(
        (t: any) => t.topic === q.topic
      );
      if (
        !course.clos.topics[index].covered.find((c: any) => c === q.chapter)
      ) {
        course.clos.topics[index].covered.push(q.chapter);
        await course.save();
      }
    }
  }
}

export async function deleteQuestion(id: string) {
  await Question.findByIdAndDelete(id);
}

export async function lockQuestion(id: string, code: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  const question = await Question.findById(id);

  if (question.covered) {
    question.locked = true;
    await question.save();
  } else {
    await Question.findByIdAndDelete(id);
  }

  const course = await Course.findOne({ code });

  const notifi = await Notifi.findOne({
    title: code,
    seen: false,
    user: course.instructor,
  });

  if (!notifi) {
    await Notifi.create({
      title: code,
      body: `Dr. ${user.firstName} ${user.lastName} has managed removed misaligned questions from the exam.`,
      type: "bank reply",
      user: course.instructor,
      from: user.id,
    });
  }

  return course.instructor.toString();
}

export async function approveQuestion(id: string, code: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const { user } = session;

  const question = await Question.findById(id);

  question.error = "";

  await question.save();

  const course = await Course.findOne({ code });

  const notifi = await Notifi.findOne({
    title: code,
    seen: false,
    user: course.instructor,
  });

  if (!notifi) {
    await Notifi.create({
      title: code,
      body: `Dr. ${user.firstName} ${user.lastName} has managed removed misaligned questions from the exam.`,
      type: "bank reply",
      user: course.instructor,
      from: user.id,
    });
  }

  return course.instructor.toString();
}
