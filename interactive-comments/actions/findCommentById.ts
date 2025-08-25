"use server"

import prisma from "@/lib/prismadb"

export async function FindCommentById(commentId: string) {
    const comment = await prisma.comment.findFirst({where:{
        id: commentId,
        isDeleted: false
    }});

    return comment
}