"use client";

import { deleteQuestion } from "@/actions/bank";
import QuestionsContent from "@/app/(main)/bank/[id]/QuestionsContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Props = { bankId: string; courseTitle: string; courseCode: string };

export default function QuestionBank({
  bankId,
  courseTitle,
  courseCode,
}: Props) {
  const { toast } = useToast();
  const [type, setType] = useState<"mcq" | "trueFalse" | "direct">("mcq");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<{
    mcq: any[];
    trueFalse: any[];
    direct: any[];
  }>({
    mcq: [],
    trueFalse: [],
    direct: [],
  });

  const newQuestion = () => {
    setQuestions((prev) => {
      const qs = { ...prev };
      qs[type] = [
        {
          id: "new",
          chapter: "1",
          type,
          question: "",
          options:
            type === "mcq"
              ? [
                  { id: "1", text: "" },
                  { id: "2", text: "" },
                  { id: "3", text: "" },
                  { id: "4", text: "" },
                ]
              : undefined,
        },
        ...qs[type],
      ];

      return qs;
    });
  };

  useEffect(() => {
    const addQuestionShortcut = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "KeyN") {
        newQuestion();
      }
    };

    document.addEventListener("keydown", addQuestionShortcut);

    return () => {
      document.removeEventListener("keydown", addQuestionShortcut);
    };
  }, [type]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/bank?id=${bankId}&type=${type}`
        );

        if (!res.ok) {
          toast({
            title: `Error: ${res.status}`,
          });
          return;
        }

        const data = await res.json();

        if (data.questions)
          setQuestions((prev) => {
            const qs: {
              mcq: any[];
              trueFalse: any[];
              direct: any[];
            } = { mcq: [], trueFalse: [], direct: [] };

            data.questions.forEach((q: any) => {
              qs[q.type as keyof typeof qs].push(q);
            });

            return qs;
          });
      } catch (err) {
        console.error(err);
        toast({
          title: `Error: ${(err as { message: string }).message}`,
        });
      } finally {
        setLoading(false);
      }
    };

    try {
      fetchQuestions();
    } catch (err) {
      console.error(err);
      toast({
        title: `Error: ${(err as { message: string }).message}`,
      });
    }
  }, []);

  const handleTabChange = (type: "mcq" | "trueFalse" | "direct") => {
    setType(type);
  };

  const updateQuestions = (question: any, prevId: string | undefined) => {
    // if (prevId && prevId === question.id) {
    const id = prevId === "new" ? prevId : question.id;
    setQuestions((prev) => {
      const qs = { ...prev };
      const index = qs[question.type as keyof typeof questions].findIndex(
        (q) => q.id === id
      );
      qs[question.type as keyof typeof questions][index] = question;
      return qs;
    });
  };

  const handleDelete = async (id: string) => {
    const index = questions[type].findIndex((q: any) => q.id === id);
    const qs = { ...questions };

    delete qs[type][index];

    setQuestions(qs);

    id !== "new" && deleteQuestion(id);
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <h1 className="mb-1 mx-20 text-xl leading-5">
        {courseCode} | {courseTitle}
      </h1>

      <Separator className="mt-5" />

      <Tabs
        defaultValue="mcq"
        className="mt-4 flex-grow overflow-hidden px-1 flex flex-col"
      >
        <div className="flex justify-between mx-20">
          <TabsList className="mb-2 self-start">
            <TabsTrigger value="mcq" onClick={() => handleTabChange("mcq")}>
              MCQ
            </TabsTrigger>
            <TabsTrigger
              value="trueFalse"
              onClick={() => handleTabChange("trueFalse")}
            >
              True/False
            </TabsTrigger>
            <TabsTrigger
              value="direct"
              onClick={() => handleTabChange("direct")}
            >
              Direct
            </TabsTrigger>
          </TabsList>
          <Button variant="secondary" size="sm" onClick={newQuestion}>
            Add<kbd className="ml-3">Alt N</kbd>
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          {!loading ? (
            <QuestionsContent
              key={type}
              type={type}
              bankId={bankId}
              questions={questions[type]}
              updateQuestions={updateQuestions}
              onDelete={handleDelete}
            />
          ) : (
            <div>
              <Loader2 className="animate-spin text-primary/50 mx-auto h-8 w-8 mt-56" />
            </div>
          )}
        </ScrollArea>
      </Tabs>
    </div>
  );
}
