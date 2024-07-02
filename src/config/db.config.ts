import mongoose from "mongoose";
import { config } from ".";
import logger from "../utils/logger";
import { retryWithExponentialBackoff } from "../utils/backoff";

// create a database connection
export default async function databaseConnect() {
    try {
        await retryWithExponentialBackoff({
            operation: async () => await mongoose.connect(config.DATABASE_URL),
            initialWait: 1000, // 1 second then 2, 4, 8...
            factor: 2,
            maxRetries: 5,
        });
        // await mongoose.connect(config.DATABASE_URL);
        logger.info("Database connection successful");
    } catch (error) {
        logger.error(error, "Error connecting to database");
        process.exit(1);
    }
}
