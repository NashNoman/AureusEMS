"use client";

import { approveQuestion, lockQuestion } from "@/actions/bank";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Check, Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";

type Props = {
  code: string;
  id: string;
  question: string;
  chapter: string;
  children: React.ReactNode;
  btl?: number;
  error?: string;
};

const BTLBadge = ({ btl }: { btl: number }) => {
  const badges = [
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-blue-500">
      Remember
    </Badge>,
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-teal-500">
      Understand
    </Badge>,
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-green-500">
      Apply
    </Badge>,
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-yellow-500">
      Analyze
    </Badge>,
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-orange-500">
      Evaluate
    </Badge>,
    <Badge className="scale-75 rounded-full ml-[-0.6rem] inline-block mb-[-10rem] bg-red-500">
      Create
    </Badge>,
  ];
  return badges[btl - 1];
};

export default function BankQuestionWrapper({
  id,
  code,
  question,
  chapter,
  children,
  btl,
  error,
}: Props) {
  const { toast } = useToast();
  const [managed, setManaged] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={cn(
          "builder-question transition-all bg-background",

          error && "bg-red-50 border-destructive dark:bg-red-900/10",
          managed && "bg-secondary text-primary/60 border-border"
        )}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-base leading-3 font-medium flex justify-between items-center">
            <div className="pt-2">
              <p className="mb-2 text-primary/90">
                Chapter
                <span
                  className={cn("transition-all rounded-sm text-center ml-1")}
                  onKeyDown={(e) => {
                    if (
                      (e.key.length === 1 &&
                        !e.key.match(/[0-9]/) &&
                        e.key.match(/[a-zA-Z]/)) ||
                      e.key.charCodeAt(0) == 32
                    ) {
                      e.preventDefault();
                      toast({
                        title: "Chapter must be a number",
                      });
                    }
                  }}
                >
                  {chapter}
                </span>
              </p>
              {btl ? (
                <BTLBadge btl={btl} />
              ) : (
                <div className="h-2 w-5 rounded-full bg-secondary mb-2"></div>
              )}
            </div>

            <div className="flex gap-1 items-center transition-all">
              <Button
                tabIndex={1}
                size="icon"
                variant="ghost"
                className="text-red-50 bg-red-500 hover:bg-red-600"
                onClick={() => {
                  lockQuestion(id, code);
                  setManaged(true);
                }}
              >
                <X />
              </Button>
              <Button
                tabIndex={1}
                size="icon"
                variant="secondary"
                className="text-green-50 bg-green-500 hover:bg-green-600"
                onClick={() => {
                  approveQuestion(id, code);
                  setManaged(true);
                }}
              >
                <Check />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div
            tabIndex={2}
            className={cn(
              "min-h-[2.5rem] mb-5 outline-1 outline-border p-1.5 rounded-sm"
            )}
          >
            {question}
          </div>
          {children}
        </CardContent>
        {!managed && (
          <CardFooter>
            <small className="text-red-500">{error}</small>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
