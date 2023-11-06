import Logo from "@/public/logo";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";

export default function BuilderNavBar() {
  // const { courseCode, courseTitle } = useSelector(
  //   (state: RootState) => state.examInfo
  // );

  return (
    <header className="sticky top-0 left-0 flex z-10 h-14 w-screen border-b justify-between bg-background items-center">
      <Logo className="fill-primary h-9 mr-2 ml-4" />
      {/* <div className="text-center flex-grow border-x">
        <p className="text-primary">Test</p>
        <p className="text-xs text-muted-foreground">
          {courseCode} - {courseTitle}
        </p>
      </div> */}
      <div className="flex items-center ml-2">
        <BellIcon className="h-7 w-7 p-1 cursor-pointer rounded-sm hover:bg-secondary transition-all" />
        <Button variant="outline" className="mx-3">
          Logout
        </Button>
      </div>
    </header>
  );
}
