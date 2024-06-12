import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Notifi from "@/models/Notifi";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) return new Response("unauthorized", { status: 401 });

  const { user } = session;

  if (user.role.type === "student")
    return new Response("unauthorized", { status: 401 });

  const url = new URL(req.url as string);

  const { searchParams } = url;

  const created = searchParams.get("created");
  if (created) {
    const notifications = await Notifi.find({
      user: user.id,
      created: { $gt: created },
    }).sort({ created: -1 });

    return Response.json(notifications);
  }

  const notifications = await Notifi.find({ user: user.id })
    .sort({ created: -1 })
    .limit(10);

  return Response.json(notifications);
}
