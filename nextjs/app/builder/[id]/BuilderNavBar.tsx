import Image from "next/image";
import logo from "@/public/logo-full.png";
import { ExitIcon } from "@radix-ui/react-icons";

export default function BuilderNavBar() {
  return (
    <header className=" sticky top-0 left-0">
      <nav className="flex w-screen border-b px-20 py-2 justify-between bg-background items-center">
        <Image src={logo} alt="Aureus Logo" width={200} />
        <div className="flex items-center gap-2 p-1">
          <p className="font-semibold">Username</p>
          <ExitIcon className="w-4 h-4" />
        </div>
      </nav>
    </header>
  );
}
