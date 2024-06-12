import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const LEVELS = [
  "Creating",
  "Evaluating",
  "Analyzing",
  "Applying",
  "Understanding",
  "Remembering",
];

export default function TopicsList({ topics }: { topics: Topic[] }) {
  const btl: Array<string[]> = [[], [], [], [], [], []];

  topics?.forEach((topic) => {
    btl[6 - topic.highest].push(topic.topic);
  });

  return (
    <TabsContent value="topics" className="rounded-md overflow-hidden">
      {btl.map((level, index) => {
        return (
          <div key={index} className={"topic-panel " + LEVELS[index]}>
            <p className={"topic-title " + LEVELS[index]}>{LEVELS[index]}</p>
            <div>
              {level.map((topic) => {
                return (
                  <span className="topic" key={topic}>
                    {topic}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </TabsContent>
  );
}
