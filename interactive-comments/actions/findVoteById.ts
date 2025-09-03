"use server"

import prisma from "@/lib/prismadb"
import { revalidatePath } from "next/cache";

export default async function FindVoteById(commentId: string){

    const vote = await prisma.vote.findFirst({
        where:{
            commentId: commentId
        }
    })

    return vote
}