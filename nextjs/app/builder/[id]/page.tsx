import Canvas from "@/app/builder/[id]/Canvas";
import SideMenu from "@/app/builder/[id]/SideMenu";

export default function Builder() {
  return (
    <div className="flex">
      <SideMenu />
      <Canvas />
    </div>
  );
}
