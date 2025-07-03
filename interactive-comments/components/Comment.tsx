"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Comment = () => {
  const [replyClicked, setReply] = useState(false);
  const replyBoxRef = useRef<HTMLDivElement>(null);

  function Reply() {
    setReply(true);
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
  },[replyClicked]);

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
          <p className="text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore id,
            atque accusamus sit debitis repellendus minima voluptates nostrum
            tempora sequi.
          </p>
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

          <div
            className="flex justify-center items-center gap-3 cursor-pointer"
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

      <div
      ref={replyBoxRef}
        className={
          replyClicked == true
            ? "w-full flex flex-col gap-5 bg-white rounded-lg p-4 mt-3"
            : "hidden"
        }
      >
        <textarea
          className="rounded-lg border-[1px] border-slate-200 outline-slate-400"
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

          <button className="text-white bg-violet-500 font-bold text-lg px-6 py-2 rounded-lg">
            REPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
