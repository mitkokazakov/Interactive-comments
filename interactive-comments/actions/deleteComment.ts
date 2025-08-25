"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache"

export default async function DeleteComment(commentId: string){

    const deletedComment = await prisma.comment.update({
        data: {
            isDeleted: true
        },
        where: {
            id: commentId
        }
    })

    revalidatePath("/")
}