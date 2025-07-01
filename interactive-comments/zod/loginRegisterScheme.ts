import {z} from 'zod'

export const loginRegisterScheme = z.object({
    email: z.string().email("Email format is invalid!"),
    password: z.string().min(4, "Password should be at least 4 characters long!")
})

export type LoginRegisterScheme = z.infer<typeof loginRegisterScheme>