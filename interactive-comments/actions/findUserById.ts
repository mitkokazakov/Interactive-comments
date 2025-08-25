"use server"

import prisma from "@/lib/prismadb"

export default async function FindUserById(userId: string){
const currentUser = await prisma.user.findFirst({
        where:{
            id: userId
        }
    })

    return currentUser
}