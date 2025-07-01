"use server"

import prisma from "@/lib/prismadb"
import { hash } from "bcryptjs"
import { LoginRegisterScheme, loginRegisterScheme } from "@/zod/loginRegisterScheme"
import { revalidatePath } from "next/cache";

export async function registerUser(data: LoginRegisterScheme) {

    const validated = loginRegisterScheme.safeParse(data);

    if(!validated.success){
        return {
            error: validated.error.format()
        }
    }

    const {email, password} = validated.data;

    const existingUser = await prisma.user.findFirst({
        where:{
            email: email
        }
    })

    if(existingUser){
        return {
            error: "User with this email already exists!"
        }
    }

    const hashedPassword = await hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email: email,
            hashedPassword: hashedPassword
        }
    })

    revalidatePath("/")

    return {
        success: "Registration was successful!"
    }
    
}
