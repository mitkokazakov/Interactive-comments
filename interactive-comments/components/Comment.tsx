"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CreateReply } from "@/actions/postReply";
import { FindUser } from "@/lib/services";
import { DateTime } from "next-auth/providers/kakao";
import { EditCommentOrReply } from "@/actions/editComment";

const Comment = ({
  parentId,
  id,
  username,
  content,
  currentUserId
}: {
  parentId: string;
  id: string;
  username: string;
  content: string;
  currentUserId: string
}) => {
  const [replyClicked, setReply] = useState(false);
  const [editClicked, setEdit] = useState(false);
  const [onEditChange, setOnEditChange] = useState(content)

  const replyBoxRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

  const userId = session?.user?.id as string;

  //const currentUser = await FindUser(userId)

  function Reply() {
    setReply(true);
  }

  function Edit(){
    setEdit(true);
  }

  async function PostReply() {
    const content = replyBoxRef.current?.querySelector("textarea")?.value || "";

    if (!content.trim()) return;

    console.log(userId);

    await CreateReply(userId, parentId, content);

    setReply(false);

    alert("Posted");
  }

  async function EditComment(){

    await EditCommentOrReply(id, onEditChange)

    alert("Edited")
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        replyBoxRef.current &&
        !replyBoxRef.current.contains(event.target as Node)
      ) {
        setReply(false);
      }
    }

    if (replyClicked) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [replyClicked]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col gap-5 bg-white rounded-lg p-4">
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8">
            <Image
              src={"/images/random.png"}
              width={32}
              height={32}
              alt="Cover"
            ></Image>
          </div>

          <p className="font-bold">amyrobson</p>

          <p>1 year ago</p>
        </div>

        <div>
          <p className={editClicked == true ? 'hidden' : "text-slate-600"}>{content}</p>

          <div className={editClicked == true ? "" : "hidden"}>

            <form action="" className="flex flex-col justify-center items-end gap-3 w-full">
              <textarea name="edit" id="edit" cols={4} value={onEditChange} onChange={e => {setOnEditChange(e.target.value)}} className="w-full rounded-lg border-[1px] border-slate-200 outline-slate-400 px-3 py-2"></textarea>

              <button className="bg-violet-500 text-white font-bold text-lg px-6 py-2 rounded-lg text-right" onClick={EditComment}>UPDATE</button>
            </form>

          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="bg-slate-100 rounded-lg flex justify-center items-center gap-5 px-2 py-1">
            <p className="font-bold text-2xl text-slate-300 cursor-pointer">
              +
            </p>
            <p className="font-bold text-blue-400">1</p>
            <p className="font-bold text-2xl text-slate-300 cursor-pointer">
              -
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-2 cursor-pointer" onClick={Edit}>
              <Image
                src={"/images/icon-edit.svg"}
                width={14}
                height={14}
                alt="Reply"
              ></Image>
              <p className="font-bold text-lg text-violet-500">Edit</p>
            </div>

            <div className="flex justify-center items-center gap-2 cursor-pointer ml-5">
              <Image
                src={"/images/icon-delete.svg"}
                width={14}
                height={14}
                alt="Reply"
              ></Image>
              <p className="font-bold text-lg text-red-700">Delete</p>
            </div>

            <div
              className={currentUserId == userId ? "hidden" : "flex justify-center items-center gap-3 cursor-pointer"}
              onClick={Reply}
            >
              <Image
                src={"/images/icon-reply.svg"}
                width={14}
                height={14}
                alt="Reply"
              ></Image>
              <p className="font-bold text-lg text-violet-500">Reply</p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={replyBoxRef}
        className={
          replyClicked == true
            ? "w-full flex flex-col gap-5 bg-white rounded-lg p-4 mt-3"
            : "hidden"
        }
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await PostReply();
          }}
          className="w-full"
        >
          <textarea
            className="rounded-lg border-[1px] border-slate-200 outline-slate-400 w-full"
            name="answer"
            id="answer"
            rows={4}
          ></textarea>

          <div className="w-full flex justify-between items-center">
            <Image
              src={"/images/random.png"}
              width={32}
              height={32}
              alt="Cover"
            ></Image>

            <button
              type="submit"
              className="text-white bg-violet-500 font-bold text-lg px-6 py-2 rounded-lg"
            >
              REPLY
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
