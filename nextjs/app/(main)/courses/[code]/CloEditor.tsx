import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ClipboardEventHandler,
  ClipboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CloEditor({
  los,
  isUpdate,
  onSave,
  onUpdate,
  isLoading,
}: {
  los: string[] | undefined;
  isUpdate: boolean;
  isLoading: boolean;
  onSave: () => Promise<void>;
  onUpdate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tempLos, setTempLos] = useState<JSX.Element[] | null>(null);

  const learningObjectives = useMemo(() => {
    if (los) {
      const lo = los.map((lo) => {
        const regex = /<([^>]*)>([^<]*)<[^>]*>/g;
        const html = lo.replace(
          regex,
          isUpdate ? "$2" : '<span class="$1 learning-objective">$2</span>'
        );

        return (
          <li className="clo" dangerouslySetInnerHTML={{ __html: html }} />
        );
      });
      return lo;
    }
  }, [los, isUpdate]);

  const handlePaste: ClipboardEventHandler<HTMLDivElement> = (
    e: ClipboardEvent<HTMLDivElement>
  ) => {
    if (!isUpdate) return;

    e.preventDefault();
    e.stopPropagation();

    const text = e.clipboardData.getData("text/plain");
    const lines = text.split("\n");
    const items = lines.map((line: string) => <li className="clo">{line}</li>);

    setTempLos(items);
  };

  return (
    <TabsContent value="objectives">
      <div className="flex gap-2">
        <div
          className={cn(
            "clos min-h-[26rem] max-h-max py-5 px-8 bg-secondary rounded-md focus-visible:outline-none mb-4 font-medium text-primary/90 flex-grow outline outline-none transition-all",
            isUpdate && "!outline-blue-500",
            isLoading && "animate-pulse"
          )}
          contentEditable={isUpdate}
          ref={ref}
          autoFocus={isUpdate}
          onPaste={handlePaste}
        >
          <ul className="list-disc">
            {isUpdate && tempLos
              ? tempLos
              : learningObjectives || <li className="clo" />}
          </ul>
        </div>
      </div>
      {isLoading ? (
        <Button variant="secondary" className="float-right">
          <Loader2 className="animate-spin" />
        </Button>
      ) : isUpdate ? (
        <Button onClick={onSave} className="float-right w-28">
          Save
        </Button>
      ) : (
        <Button onClick={onUpdate} className="float-right w-28">
          Update
        </Button>
      )}
    </TabsContent>
  );
}
