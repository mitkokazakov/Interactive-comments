"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

export default async function VotePlus(commentId: string, userId: string) {

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    })

    const newLikes = comment?.likes as number + 1;

    const targetVote = await prisma.vote.findFirst({
    where: {
      commentId: commentId,
    },
  });

    if (targetVote == null) {
    const vote = await prisma.vote.create({
      data: {
        type: "PLUS",
        userId: userId,
        commentId: commentId,
      },
    });
  }
  else{
    const vote = await prisma.vote.update({
        data:{
            type: "PLUS",
            
        },
        where:{
            id: targetVote.id
        }
    })
  }

    const updatedComment = await prisma.comment.update({
        data: {
            likes: newLikes
        },
        where:{
            id: commentId
        }
    })

    revalidatePath("/")
}