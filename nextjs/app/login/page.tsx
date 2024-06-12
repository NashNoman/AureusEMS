import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Logo from "@/public/logo-full.png";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginFormCard from "@/components/ui/login-form-card";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <LoginFormCard>
      <Image
        src={Logo}
        width={180}
        height={180}
        alt="aureus logo"
        className="mb-4 dark:invert"
      />
      <div>
        <h3>Login</h3>
        {/* <p className="text-muted-foreground">to continue to Aureus</p> */}
      </div>
      <LoginForm />
    </LoginFormCard>
  );
}
