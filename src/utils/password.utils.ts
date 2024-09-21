import bcrypt from "bcryptjs";
import crypto from "crypto";

/**
 *
 * @param password
 * @returns hashedPassword
 */
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

/**
 *
 * @param password
 * @param hashedPassword
 * @returns validity of password as boolean
 */
export async function validatePassword(
    password: string,
    hashedPassword: string
) {
    return await bcrypt.compare(password, hashedPassword);
}

/**
 * Generates a hashed password reset token
 * @returns the hashed token in hex notation
 */
export function createPasswordResetToken(): string {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}

/**
 * Generates an email verification token
 * @returns the hashed token in hex notation
 */
export function createEmailVerificationToken(): string {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
}
