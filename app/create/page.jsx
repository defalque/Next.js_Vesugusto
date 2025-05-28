import { auth } from "@/auth";
import ChatBot from "../_components/ui/ChatBot";

export const metadata = {
  title: "creIAmo",
};

export default async function Page() {
  const session = await auth();
  return <ChatBot userId={session?.user?.userId}></ChatBot>;
}
