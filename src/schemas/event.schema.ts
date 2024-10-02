// import * as z from "zod";

// export const userRegisteredEventSchema = z.object({
//     eventType: z.string().default("user_registered"),
//     userId: z.string(),
//     email: z.string().email(),
//     url: z.string().url(),
// });

// export const passwordResetRequestedEventSchema = z.object({
//     eventType: z.string().default("password_reset"),
//     userId: z.string(),
//     email: z.string().email(),
//     url: z.string().url(),
// });

// export const passwordResetCompletedEventSchema = z.object({
//     eventType: z.string().default("password_changed"),
//     userId: z.string(),
//     email: z.string().email(),
// });

// export const accountVerifiedEventSchema = z.object({
//     eventType: z.string().default("verified"),
//     userId: z.string(),
//     email: z.string().email(),
// });

// // event types
// export type UserRegisteredEvent = typeof userRegisteredEventSchema;
// export type PasswordResetRequestedEvent =
//     typeof passwordResetRequestedEventSchema;
// export type PasswordResetCompletedEvent =
//     typeof passwordResetCompletedEventSchema;
// export type AccountVerifiedEvent = typeof accountVerifiedEventSchema;
