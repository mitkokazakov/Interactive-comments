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
    const allComments = await prisma.comment.findMany({where:{
        parentId: null,
        isDeleted: false
    },
    orderBy: {
        createdAt: 'asc'
    }
    });

    return allComments
}

export async function GetAllRepliesByComment(commentId: string) {

    const replies = await prisma.comment.findMany({where:{
        parentId: commentId,
        isDeleted: false
    }})
    
    return replies
}

export async function GetCommentById(commentId: string){

    const comment = await prisma.comment.findFirst({
        where: {
            id: commentId,
            isDeleted: false
        },
        include:{
            votes: {
                select:{
                    type: true
                }
            }
        }
    })

    return comment
}

export async function GetVoteType(commentId: string, userId: string){

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