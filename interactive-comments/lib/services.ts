import prisma from "./prismadb";

export async function FindUser(userId: string){

    const currentUser = await prisma.user.findFirst({
        where:{
            id: userId
        }
    })

    return currentUser

}

export async function GetAllComments() {
    const allComments = await prisma.comment.findMany();

    return allComments
}