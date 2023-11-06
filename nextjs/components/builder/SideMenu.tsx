"use client";

import { useSelector } from "react-redux";

export default function SideMenu() {
  const examInfo = useSelector((state: RootState) => state.examInfo);

  return (
    <aside className="h-full sticky w-1/6 p-3 left-0 top-0 bg-background border-r">
      <div className="">
        <p>{examInfo.courseCode}</p>
        <p>{examInfo.courseTitle}</p>
        <p>{examInfo.examType.toUpperCase()}</p>
      </div>
    </aside>
  );
}
