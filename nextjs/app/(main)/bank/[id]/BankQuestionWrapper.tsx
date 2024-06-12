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

type Props = {
  question: string;
  chapter: string;
  children: React.ReactNode;
  refs: any;
  isEdit: boolean;
  isClassifying: boolean;
  btl?: number;
  error?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
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
  question,
  chapter,
  children,
  refs,
  isEdit,
  isClassifying,
  btl,
  error,
  onEdit,
  onDelete,
  onSave,
}: Props) {
  const { toast } = useToast();

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
          (isEdit || isClassifying) &&
            "border-2 focus-within:border-blue-500 scale-[1.03]",
          isClassifying && "animate-pulse",
          error && "bg-red-50 border-destructive dark:bg-red-900/10"
        )}
        onDoubleClick={onEdit}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-base leading-3 font-medium flex justify-between items-center">
            <div className="pt-2">
              <p className="mb-2 text-primary/90">
                Chapter
                <span
                  ref={(r) => (refs.current[0] = r)}
                  contentEditable={isEdit}
                  tabIndex={2}
                  autoFocus
                  className={cn(
                    "transition-all rounded-sm text-center ml-1",
                    isEdit &&
                      "px-2 outline outline-2 outline-border focus-within:outline-blue-500"
                  )}
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
            {isEdit ? (
              <div className="flex gap-1 items-center transition-all">
                <Button
                  tabIndex={1}
                  size="icon"
                  variant="ghost"
                  className="text-primary/30 hover:text-primary/70"
                  onClick={onEdit}
                >
                  <X />
                </Button>
                <Button
                  tabIndex={1}
                  size="icon"
                  variant="secondary"
                  className="text-green-50 bg-green-500 hover:bg-green-600"
                  onClick={onSave}
                >
                  <Check />
                </Button>
              </div>
            ) : !isClassifying ? (
              <div className="flex items-center opacity-0 editing-icons transition-all">
                <Button
                  tabIndex={1}
                  size="icon"
                  variant="ghost"
                  className="text-primary/30 hover:text-primary/70"
                  onClick={onEdit}
                >
                  <Pencil1Icon className="h-5 w-5" />
                </Button>
                <DeleteAlert onConfirm={onDelete}>
                  <Button
                    tabIndex={1}
                    size="icon"
                    variant="ghost"
                    className="text-primary/30 hover:text-primary/70"
                  >
                    <Trash2 className="h-5" />
                  </Button>
                </DeleteAlert>
              </div>
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div
            contentEditable={isEdit}
            autoFocus={isEdit}
            tabIndex={2}
            className={cn(
              "min-h-[2.5rem] mb-5 outline-1 outline-border p-1.5 rounded-sm",
              isEdit && "outline outline-2 focus-within:outline-blue-500"
            )}
            ref={(r) => (refs.current[1] = r)}
          >
            {question}
          </div>
          {children}
        </CardContent>
        {error && (
          <CardFooter>
            <small className="text-red-500">{error}</small>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}

const DeleteAlert = ({ onConfirm, onCancel, children }: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. You will lose all the data related to
            this question.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
