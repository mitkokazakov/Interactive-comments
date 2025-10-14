"use server"

import prisma from "@/lib/prismadb"

export async function FindVoteType(commentId: string, userId: string){

    const vote = await prisma.vote.findFirst({
        where: {
            commentId: commentId,
            userId: userId
        },
        select:{
            type: true
        }
    })

    return vote?.type as string
}