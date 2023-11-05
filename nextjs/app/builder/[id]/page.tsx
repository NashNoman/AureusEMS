import BuilderNavBar from "@/app/builder/[id]/BuilderNavBar";
import Canvas from "@/app/builder/[id]/Canvas";
import ReduxProvider from "@/app/builder/[id]/ReduxProvider";

export default function Builder() {
  return (
    <>
      <BuilderNavBar />
      <Canvas />
    </>
  );
}
