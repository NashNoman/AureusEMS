import BuilderMain from "@/components/builder/BuilderMain";
import BuilderSidebar from "@/components/builder/BuilderSidebar";

export default function Builder() {
  return (
    <div className="flex h-[calc(100%-3rem)] ">
      <BuilderSidebar />
      <BuilderMain />
    </div>
  );
}
