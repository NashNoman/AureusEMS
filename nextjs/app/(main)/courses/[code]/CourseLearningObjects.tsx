"use client";

import { classifyClos } from "@/actions/clos";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CloEditor from "@/app/(main)/courses/[code]/CloEditor";
import TopicsList from "@/app/(main)/courses/[code]/TopicsList";
import { socket } from "@/components/NotificationButton";

type Props = {
  closId: string | undefined;
  courseId: string;
  instructorId: string;
};

export default function CourseLearningObjectives({
  closId,
  courseId,
  instructorId,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [clos, setClos] = useState<CLO | null>(null);
  const [update, setUpdate] = useState(!closId);

  useEffect(() => {
    const fetchClos = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/clos?id=${closId}`);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        console.log("clos", data);

        setClos(data);
      } catch (err: any) {
        toast({
          title: err.message + "asd",
          variant: "destructive",
        });
      } finally {
      }
    };

    if (closId) {
      fetchClos();
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const closDiv = document.querySelector("div.clos");
    const clos = closDiv?.querySelectorAll("li") as NodeListOf<HTMLLIElement>;

    if (!clos) return;

    const cloList = Array.from(clos)
      .map((clo) => clo.textContent?.trim())
      .filter((clo) => clo !== "");

    if (!cloList) return;

    const res = await classifyClos(cloList as string[], courseId);

    if (res.message) {
      toast({
        title: `Error: ${res.message}`,
        variant: "destructive",
      });
    }

    const los = res;

    const notification = JSON.stringify({
      message: "notification",
      instructorId,
    });

    if (!los.los.some((lo: any) => lo.error)) {
      socket.send(notification);
      setUpdate(false);
    }
    setLoading(false);
    setClos({
      _id: los.id,
      los: los.los.map((lo: any) => lo.text) as string[],
      topics: los.topics as Topic[],
      highest: los.highest as number,
    });
  };

  return (
    <Tabs defaultValue="objectives">
      {clos && (
        <>
          <TabsList className="mb-2">
            <TabsTrigger className="transition-all" value="objectives">
              Objectives
            </TabsTrigger>
            <TabsTrigger className="transition-all" value="topics">
              Topics
            </TabsTrigger>
          </TabsList>
          <TopicsList topics={clos?.topics as Topic[]} />
        </>
      )}
      <CloEditor
        los={clos?.los}
        onSave={handleSubmit}
        isUpdate={update}
        isLoading={loading}
        onUpdate={() => setUpdate(true)}
      />
    </Tabs>
  );
}
