import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CreateComment } from "@/actions/postComment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authoptions";
import { FindUser } from "@/lib/services";

const AddComment = async () => {

  const session = await getServerSession(authOptions)

  const userId = session?.user.id as string

  const currentUser = await FindUser(userId)

  const userImage = currentUser?.image


  return (
    <div className="w-full flex flex-col gap-5 bg-white rounded-lg p-4 mt-3">
      <form className="w-full" action={CreateComment}>
        <textarea
          className="w-full rounded-lg border-[1px] border-slate-200 outline-slate-400 p-2"
          name="comment"
          id="comment"
          rows={4}
          placeholder="Add a comment..."
        ></textarea>

        <div className="w-full flex justify-between items-center">
          <Link href={"/myprofile"} className=" rounded-full">
            <Image
              src={userImage != null ? `/uploads/${userImage}` : '/images/unknown.png'}
              width={32}
              height={32}
              alt="Cover"
              className="rounded-full"
            ></Image>
          </Link>

          <button
            type="submit"
            className="text-white bg-violet-500 font-bold text-lg px-6 py-2 rounded-lg"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
