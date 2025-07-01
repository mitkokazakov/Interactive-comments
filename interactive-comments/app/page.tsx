import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const sessionText = JSON.stringify(session);

  return (
   <div className="min-h-screen bg-[#f3f5f8]">
    Home Page
    <p>{sessionText}</p>
   </div>
  );
}
