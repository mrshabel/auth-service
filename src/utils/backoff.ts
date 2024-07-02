import { ExponentialBackoff } from "../types/backoff.type";
import logger from "./logger";

/**
 *
 * @param {() => Promise<unknown>} operation - The operation to retry
 * @param {number} initialWait - The number of milliseconds to wait for first retry
 * @param {number} factor - The factor by which each retry delays until the successive trial is carried on
 * @param {number} maxRetries - The maximum number of times to retry the operation
 * @returns {Promise<unknown>} - The outcome of the asynchronous operation
 * @throws - An exception is thrown if the maximum retries fails
 */
export async function retryWithExponentialBackoff({
    operation,
    initialWait,
    factor,
    maxRetries,
}: ExponentialBackoff) {
    let attempt = 0;
    let delay = initialWait;

    while (attempt < maxRetries) {
        // retry only when the max retries has not been exceeded
        try {
            return await operation();
        } catch (error) {
            // increase attempt count
            attempt++;

            // throw error if maximum retries is reached
            if (attempt >= maxRetries) {
                throw error;
            }
            // wait for delay time to elapse
            await new Promise((resolve) => setTimeout(resolve, delay));

            // log next trial time to the console
            logger.warn(`Attempt ${attempt} failed. Retrying in ${delay} ms`);

            // increase wait
            delay = delay * factor;
        }
    }
}
