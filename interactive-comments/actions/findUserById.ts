"use server"

import prisma from "@/lib/prismadb"

export default async function FindUserById(userId: string){

    if (userId == null){
        return null
    }

const currentUser = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    return currentUser
}