"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { CreateReply } from "@/actions/postReply";
import { FindUser } from "@/lib/services";
import { EditCommentOrReply } from "@/actions/editComment";
import DeleteComment from "@/actions/deleteComment";
import FindUserById from "@/actions/findUserById";
import { FindCommentById } from "@/actions/findCommentById";
import VotePlus from "@/actions/votePlus";

const Comment = ({
  parentId,
  id,
  likes,
  content,
  currentUserId,
}: {
  parentId: string;
  id: string;
  likes: number;
  content: string;
  currentUserId: string;
}) => {
  const [replyClicked, setReply] = useState(false);
  const [editClicked, setEdit] = useState(false);
  const [onEditChange, setOnEditChange] = useState(content);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [userInfo,setUserInfo] = useState({
    userImage: '/images/unknown.png',
    commentDate: '',
    username: ''
  })

  const replyBoxRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

  const userId = session?.user?.id as string;

  //const currentUser = await FindUser(userId)

  function HandleDeleteButton() {
    setDeleteModalActive(true);
    console.log("del");
  }

  function HandleCancelDelete(){
    setDeleteModalActive(false)
  }

  function Reply() {
    setReply(true);
  }

  function Edit() {
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

  async function EditComment() {
    await EditCommentOrReply(id, onEditChange);

    alert("Edited");
  }

  async function HandleDeleteComment(){
    await DeleteComment(id)
    alert("deleted")
  }

  async function HandleUserImage(){
    const currentUser = await FindUserById(userId);
    const comment = await FindCommentById(id)

    const userImage = currentUser?.image

    const userImagePath = userImage != null ? `/uploads/${userImage}` : '/images/unknown.png'

    const commentDate = comment?.createdAt

    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

    const formated =  commentDate?.toLocaleDateString("en-US", options)

    const userEmail = currentUser?.email

    const emailUsername = userEmail?.split('@')[0]

    setUserInfo({
      userImage: userImagePath,
      commentDate: formated as string,
      username: emailUsername as string
    })
  }

  async function HandleVotePlus(){
      await VotePlus(id)
      alert("voted")
  }


  useEffect(() => {

    HandleUserImage();

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
              src={userInfo?.userImage}
              width={32}
              height={32}
              alt="Cover"
              className="rounded-full"
            ></Image>
          </div>

          <p className="font-bold">{userInfo.username}</p>

          <p>{userInfo.commentDate}</p>
        </div>

        <div>
          <p className={editClicked == true ? "hidden" : "text-slate-600"}>
            {content}
          </p>

          <div className={editClicked == true ? "" : "hidden"}>
            <form
              action=""
              className="flex flex-col justify-center items-end gap-3 w-full"
            >
              <textarea
                name="edit"
                id="edit"
                cols={4}
                value={onEditChange}
                onChange={(e) => {
                  setOnEditChange(e.target.value);
                }}
                className="w-full rounded-lg border-[1px] border-slate-200 outline-slate-400 px-3 py-2"
              ></textarea>

              <button
                className="bg-violet-500 text-white font-bold text-lg px-6 py-2 rounded-lg text-right"
                onClick={EditComment}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="bg-slate-100 rounded-lg flex justify-center items-center gap-5 px-2 py-1">
            <p className="font-bold text-2xl text-slate-300 cursor-pointer" onClick={HandleVotePlus}>
              +
            </p>
            <p className="font-bold text-blue-400">{likes}</p>
            <p className="font-bold text-2xl text-slate-300 cursor-pointer">
              -
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={Edit}
            >
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
              <p
                className="font-bold text-lg text-red-700"
                onClick={HandleDeleteButton}
              >
                Delete
              </p>
            </div>

            <div
              className={
                currentUserId == userId
                  ? "hidden"
                  : "flex justify-center items-center gap-3 cursor-pointer"
              }
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

      <div
        className={
          deleteModalActive == true
            ? "h-screen w-full flex justify-center items-center fixed top-0 left-0 z-10 bg-[#0000002D] rounded-lg"
            : "hidden"
        }
      >
        <div className="flex flex-col w-[80%] px-5 py-5 justify-center items-center gap-5 bg-white">
          <h3 className="text-2xl font-bold tracking-widest">Delete Comment</h3>
          <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>

          <div className="flex justify-center items-center gap-5">

            <button className="px-5 py-2 text-white bg-slate-400 font-bold tracking-widest rounded-lg" onClick={HandleCancelDelete}>CANCEL</button>
            <button className="px-5 py-2 text-white bg-red-400 font-bold tracking-widest rounded-lg" onClick={HandleDeleteComment}>DELETE</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
