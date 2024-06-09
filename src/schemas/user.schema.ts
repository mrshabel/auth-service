import * as z from "zod";

export const signupUserSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
        })
        .required(),
});

export const loginUserSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
        })
        .required(),
});

export const createUserSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
        })
        .required(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type SignupUserInput = z.TypeOf<typeof signupUserSchema>;
export type LoginUserInput = z.TypeOf<typeof loginUserSchema>;
