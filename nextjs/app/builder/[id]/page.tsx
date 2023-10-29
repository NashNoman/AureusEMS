import Canvas from "@/app/builder/[id]/Canvas";
import ReduxProvider from "@/app/builder/[id]/ReduxProvider";

export default function Builder() {
  return (
    <ReduxProvider>
      <Canvas />
    </ReduxProvider>
  );
}
