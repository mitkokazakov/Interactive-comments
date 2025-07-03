import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";

import Comment from "@/components/Comment";
import CommentWrapper from "@/components/CommentWrapper";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const sessionText = JSON.stringify(session);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <div className="flex flex-col justify-center items-center p-4">
        {/* <Comment/> */}

        <CommentWrapper/>
      </div>
    </div>
  );
}
