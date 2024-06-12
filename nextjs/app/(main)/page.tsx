import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import HomeTable from "@/components/home/HomeTable";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Home - Aureus",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role?.type === "student") notFound();

  await dbConnect();

  return (
    <>
      <HomeTable />
    </>
  );
}
