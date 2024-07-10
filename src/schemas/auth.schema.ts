import * as z from "zod";

export const signupSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
            firstName: z.string({ required_error: "First Name is required" }),
            lastName: z.string({ required_error: "Last Name is required" }),
        })
        .required(),
});

export const loginSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z.string({ required_error: "Password is required" }),
        })
        .required(),
});

export const logoutSchema = z.object({
    body: z
        .object({
            sessionId: z.string({ required_error: "Session ID is required" }),
        })
        .required(),
});

// define request types
export type SignupInput = z.TypeOf<typeof signupSchema>;
export type SignupRequest = typeof signupSchema;

export type LoginInput = z.TypeOf<typeof loginSchema>;
export type LoginRequest = typeof loginSchema;

export type LogoutInput = z.TypeOf<typeof logoutSchema>;
export type LogoutRequest = typeof logoutSchema;
