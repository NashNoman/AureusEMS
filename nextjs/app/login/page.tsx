import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Logo from "@/public/logo-full.png";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-3 w-96 px-6 pt-8 pb-6 rounded-lg shadow-2xl">
      <Image
        src={Logo}
        width={180}
        height={180}
        alt="aureus logo"
        className="mb-4"
      />
      <div>
        <h3>Login</h3>
        <p className="text-muted-foreground">to continue to Aureus</p>
      </div>
      <LoginForm />
    </div>
  );
}
