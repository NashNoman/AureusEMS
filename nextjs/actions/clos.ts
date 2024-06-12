"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CLO from "@/models/CLO";
import Course from "@/models/Course";
import Dept from "@/models/Dept";
import Notifi from "@/models/Notifi";
import { getServerSession } from "next-auth";

export async function classifyClos(clos: string[], courseId: string) {
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session.user) throw new Error("Unauthorized access.");

    const course = await Course.findById(courseId).populate({
      path: "dept",
      model: Dept,
    });

    const { user } = session;

    if (
      (user.role.type === "dean" && course.dept.school !== user.role.school) ||
      (user.role.type === "dept_head" &&
        course.dept._id.toString() !== user.role.dept)
    )
      throw new Error("Unauthorized access.");

    const res = await fetch("http://127.0.0.1:5000/clos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clos,
      }),
      cache: "no-cache",
    });

    if (!res.ok) throw new Error("Unable to connect to API server");

    const los = await res.json();

    if (los.los.some((lo: any) => lo.error)) {
      return los;
    }

    let clo: any;
    let notify = `Dr. ${user.firstName} ${user.lastName} has added the course learning objectives`;

    const LOS = los.los.map((lo: any) => lo.text);
    if (course.clos) {
      clo = await CLO.findById(course.clos);
      clo.los = LOS;
      clo.highest = los.highest;
      clo.topics = los.topics;
      notify = `Dr. ${user.firstName} ${user.lastName} has updated the course learning objectives`;
      await clo.save();
    } else {
      clo = await CLO.create({
        los: LOS,
        highest: los.highest,
        topics: los.topics,
        course: courseId,
      });
      course.clos = clo._id;
      await course.save();
    }

    if (course.instructor !== user.id) {
      const notification = await Notifi.findOne({
        title: course.code,
        seen: false,
        user: course.instructor,
      });

      if (notification) {
        notification.created = new Date().getTime();
        notification.body = notify;
        await notification.save();
      } else {
        const notifi = new Notifi({
          title: course.code,
          body: notify,
          ugent: false,
          link: `/clos?id=${clo._id}`,
          seen: false,
          type: "CLOs",
          user: course.instructor,
          from: user.id,
        });
        await notifi.save();
      }
    }

    return los;
  } catch (err) {
    console.log(err);

    return { message: "Unable to connect to API server" };
  }
}
