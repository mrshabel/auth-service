import express, { Express } from "express";
import { config } from "./config";
import logger from "./utils/logger";
import databaseConnect from "./config/db.config";

// import routes
import {
    healthCheckRoute,
    notFoundRoute,
    authRoutes,
    userRoutes,
} from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();

// define `pre` middleware configurations
app.use(express.json());

// define routes
app.use(healthCheckRoute);
app.use(authRoutes);
app.use(userRoutes);

app.use(notFoundRoute);

// define `post` middleware configurations
app.use(errorMiddleware);

const server = app.listen(config.PORT, async () => {
    logger.info(`Listening to all incoming requests on port ${config.PORT}`);

    await databaseConnect();
});

// handle synchronous server exceptions
process.on("uncaughtException", (error) => {
    logger.fatal(error, "Uncaught exception detected!");

    // gracefully shutdown server
    server.close(() => {
        logger.warn("Server closed gracefully");
        process.exit(1);
    });
});

// handle asynchronous server exceptions thrown from promises
process.on("unhandledRejection", (error) => {
    logger.fatal(error, "Unhandled exception detected!");

    // gracefully shutdown server
    server.close(() => {
        logger.warn("Server closed gracefully");
        process.exit(1);
    });
});
