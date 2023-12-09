import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Logo from "@/public/logo-full.png";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-3 w-[26rem] px-8 pt-12 pb-3 rounded-2xl shadow-2xl">
      <Image
        src={Logo}
        width={180}
        height={180}
        alt="aureus logo"
        className="mb-4"
      />
      <div>
        <h3>Login</h3>
        {/* <p className="text-muted-foreground">to continue to Aureus</p> */}
      </div>
      <LoginForm />
    </div>
  );
}
