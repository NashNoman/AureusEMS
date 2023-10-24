import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const BuilderQuestion = () => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-bold text-xl">01</h3>
        <div>
          <div className="bg-red-200 text-red-400 rounded-full font-bold text-center inline-block w-5 text-sm">
            <p>C</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-7 font-semibold">Question statement:</p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 border p-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow">
            <span className="text-secondary-foreground font-bold">A</span>
            <p>Answer 1</p>
          </div>
          <div className="flex gap-3 border p-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow">
            <span className="text-secondary-foreground font-bold">B</span>
            <p>Answer 2</p>
          </div>
          <div className="flex gap-3 border p-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow">
            <span className="text-secondary-foreground font-bold">C</span>
            <p>Answer 3</p>
          </div>
          <div className="flex gap-3 border p-3 rounded-lg hover:shadow-md cursor-pointer transition-shadow">
            <span className="text-secondary-foreground font-bold">D</span>
            <p>Answer 4</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
