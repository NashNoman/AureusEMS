import Canvas from "@/components/builder/Canvas";
import SideMenu from "@/components/builder/SideMenu";

export default function Builder() {
  return (
    <div className="flex">
      <SideMenu />
      <Canvas />
    </div>
  );
}
