"use server";

import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authoptions";

export async function CreateComment(formData: FormData) {

  const session = await getServerSession(authOptions);

  const currentUserId = session?.user?.id as string;

  const content = formData.get("comment") as string

  console.log(currentUserId);
  console.log(content);
  

  const comment = await prisma.comment.create({
    data: {
      content: content,
      userId: currentUserId,
    },
  });

  revalidatePath("/");
}
