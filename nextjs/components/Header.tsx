import AccountIcon from "@/components/AccountDialog";
import HeaderTitle from "@/components/HeaderTitle";
import NotificationButton from "@/components/NotificationButton";

export default function Header({ user }: { user: User }) {
  return (
    <header className="px-20 backdrop-blur-lg flex justify-between items-center mb-12">
      <HeaderTitle />

      <div className="flex gap-4 items-center">
        <NotificationButton />
        <AccountIcon user={user} />
      </div>
    </header>
  );
}
