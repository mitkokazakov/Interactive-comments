"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

export default async function VotePlus(commentId: string) {

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId
        }
    })

    const newLikes = comment?.likes as number + 1;

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