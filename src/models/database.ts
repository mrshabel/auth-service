import mongoose from "mongoose";
import { config } from "../config";
import logger from "../utils/logger";

// create a database connection
export default async function databaseConnect() {
    try {
        await mongoose.connect(config.DATABASE_URL);
        logger.info("Database connection successful");
    } catch (error) {
        logger.error(error, "Error connecting to database");
        process.exit(1);
    }
}
