import React from "react";
import Comment from "./Comment";

const CommentWrapper = async ({parentId}: {parentId: string}) => {
  
  

  return (
    <div className="w-full flex flex-col justify-center items-end gap-4">
      <Comment parentId="parrrr" />

      <div className="w-[90%] flex flex-col justify-center items-center gap-4 border-l-[1px] border-l-slate-400 pl-5">
        <Comment parentId="parrrr" />
        <Comment parentId="parrrr" />
        <Comment parentId="parrrr" />
      </div>
    </div>
  );
};

export default CommentWrapper;
