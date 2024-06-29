import bcrypt from "bcryptjs";

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
