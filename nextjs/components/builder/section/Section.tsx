import MCQSectionBody from "@/components/builder/section/MCQSectionBody";
import SectionHeader from "@/components/builder/section/SectionHeader";
import SectionWrapper from "@/components/builder/section/SectionWrapper";
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
