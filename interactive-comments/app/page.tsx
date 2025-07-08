import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import CommentWrapper from "@/components/CommentWrapper";
import AddComment from "@/components/AddComment";
import { GetAllComments } from "@/lib/services";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const sessionText = JSON.stringify(session);

  const allComments = await GetAllComments()

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <div className="flex flex-col justify-center items-center p-4">

        {
          allComments?.map(c => <CommentWrapper parentId={c.id}/>)
        }

        
        {/* <CommentWrapper/> */}

        <AddComment/>
      </div>
    </div>
  );
}
