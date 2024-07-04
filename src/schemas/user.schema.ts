import * as z from "zod";

export const addOneUserSchema = z.object({
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

export type AddOneUserInput = z.TypeOf<typeof addOneUserSchema>;
