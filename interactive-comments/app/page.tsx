
import CommentWrapper from "@/components/CommentWrapper";
import AddComment from "@/components/AddComment";
import { GetAllComments } from "@/lib/services";

export default async function Home() {

  const allComments = await GetAllComments()

  return (
    <div className="min-h-screen bg-[#f3f5f8] ">
      <div className="flex flex-col justify-center items-center gap-4 p-4 max-w-[1200px] mx-auto">

        {
          allComments?.map(c => <CommentWrapper key={c.id} parentId={c.id}/>)
        }

        
        {/* <CommentWrapper/> */}

        <AddComment/>
      </div>
    </div>
  );
}
