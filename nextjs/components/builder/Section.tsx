import MCQSectionBody from "@/components/builder/MCQSectionBody";
import SectionHeader from "@/components/builder/SectionHeader";
import SectionWrapper from "@/components/builder/SectionWrapper";
import { Separator } from "@/components/ui/separator";

export default function Section() {
  return (
    <SectionWrapper>
      <SectionHeader />
      <Separator className="my-4" />
      <MCQSectionBody />
    </SectionWrapper>
  );
}
