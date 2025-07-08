"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache"

export async function CreateReply(userId: string, commentId: string, content: string) {
    
    const reply = await prisma.comment.create({
        data:{
        content: content,
        parentId: commentId,
        userId: userId,
        isReply: true
    }
    })

    revalidatePath("/")
}