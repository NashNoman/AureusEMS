import Canvas from "@/components/builder/Canvas";
import SideMenu from "@/components/builder/SideMenu";

export default function Builder() {
  return (
    <div className="flex h-[calc(100%-3.5rem)] overflow-y-auto">
      <SideMenu />
      <Canvas />
    </div>
  );
}
