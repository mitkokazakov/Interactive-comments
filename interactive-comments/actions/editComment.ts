"use server";

import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function EditCommentOrReply(commentId: string, content: string) {
  const editedComment = await prisma.comment.update({
    data: {
      content: content,
      createdAt: new Date()
    },
    where: {
      id: commentId,
    },
  });

  revalidatePath("/")
}
