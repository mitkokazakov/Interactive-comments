"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache"

export async function CreateReply(userId: string, commentId: string, content: string) {
    
    const reply = await prisma.reply.create({
        data:{
        content: content,
        commentId: commentId,
        userId: userId
    }
    })

    revalidatePath("/")
}