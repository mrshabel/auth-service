import * as z from "zod";

const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const signupSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
            password: z
                .string({ required_error: "Password is required" })
                .regex(
                    passwordRegex,
                    "Password should have at least a combination of 8 alphanumeric and special characters"
                ),
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

export const forgotPasswordSchema = z.object({
    body: z
        .object({
            email: z
                .string({ required_error: "Email is required" })
                .email({ message: "Not a valid email" }),
        })
        .required(),
});

export const resetPasswordSchema = z.object({
    body: z
        .object({
            password: z
                .string({ required_error: "Password is required" })
                .regex(
                    passwordRegex,
                    "Password should have at least a combination of 8 alphanumeric and special characters"
                ),
        })
        .required(),
    params: z
        .object({
            token: z.string({
                required_error: "Password Reset Token is required",
            }),
        })
        .required(),
});

// define request types
export type SignupRequest = typeof signupSchema;
export type SignupInput = z.infer<SignupRequest>;

export type LoginRequest = typeof loginSchema;
export type LoginInput = z.infer<LoginRequest>;

export type LogoutRequest = typeof logoutSchema;
export type LogoutInput = z.infer<LogoutRequest>;

export type ForgotPasswordRequest = typeof forgotPasswordSchema;
export type ForgotPasswordInput = z.infer<ForgotPasswordRequest>;

export type ResetPasswordRequest = typeof resetPasswordSchema;
export type ResetPasswordInput = z.infer<ResetPasswordRequest>;
