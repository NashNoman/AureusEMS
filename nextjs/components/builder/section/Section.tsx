import SectionBody from "@/components/builder/section/SectionBody";
import SectionHeader from "@/components/builder/section/SectionHeader";
import SectionWrapper from "@/components/builder/section/SectionWrapper";
import { Separator } from "@/components/ui/separator";

export default function Section() {
  return (
    <SectionWrapper>
      <SectionHeader />
      <Separator className="my-4" />
      <SectionBody>
        <div></div>
      </SectionBody>
    </SectionWrapper>
  );
}
