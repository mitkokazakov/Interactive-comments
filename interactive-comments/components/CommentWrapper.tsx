import React from "react";
import Comment from "./Comment";
import { GetAllRepliesByComment, GetCommentById } from "@/lib/services";

const CommentWrapper = async ({parentId}: {parentId: string}) => {
  
  const allReplies = await GetAllRepliesByComment(parentId)

  const currentComment = await GetCommentById(parentId)

  const content = currentComment?.content as string
  const username = currentComment?.userId as string
  const date = currentComment?.createdAt
  const userId = currentComment?.userId as string

  return (
    <div className="w-full flex flex-col justify-center items-end gap-4">
      <Comment parentId={parentId} id={parentId} content={content} username={username} currentUserId={userId}/>

      <div className="w-[90%] flex flex-col justify-center items-center gap-4 border-l-[1px] border-l-slate-400 pl-5">
      
        {
          (allReplies).map(r => <Comment key={r.id} parentId={parentId} id={r.id} content={r.content} username={r.userId} currentUserId={r.userId}/>)
        }
      </div>
    </div>
  );
};

export default CommentWrapper;
