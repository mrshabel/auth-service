import * as z from "zod";

export const createUserSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: "Email is required" })
            .email({ message: "Not a valid email" }),
        password: z.string({ required_error: "Password is required" }),
    }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
