import markAsRead from "@/actions/notifications";
import MisalignedExamQuestionsDialog from "@/components/MisalignedExamQuestionsDialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import moment from "moment";
import Link from "next/link";

export default function Notification({
  id,
  title,
  body,
  type,
  seen,
  link,
  created,
  from,
  urgent,
  onClick,
}: Notifi & { onClick: (id: string) => void; urgent: boolean }) {
  console.log(link);

  return (
    <Link href={`${link}/${id}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className={cn(
          "p-3 text-sm cursor-pointer flex flex-col text-primary/60 bg-secondary border-b border-border",
          !seen && "bg-blue-200 text-primary",
          !seen && urgent && "bg-red-200 text-primary"
        )}
        onClick={() => {
          if (!seen) markAsRead(id);
          onClick(id);
        }}
      >
        <p>
          <span className="font-semibold">{title}: </span>
          {body}.
        </p>
        <p className="text-xs text-primary/60">{moment(created).fromNow()}</p>
      </motion.div>
    </Link>
  );
}
