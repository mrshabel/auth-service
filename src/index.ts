import express, { Express } from "express";
import { config } from "./config";
import logger, { requestLogger } from "./utils/logger";
import databaseConnect from "./config/db.config";

// import routes
import {
    healthCheckRoute,
    notFoundRoute,
    authRoutes,
    userRoutes,
    sessionRoutes,
    permissionRoutes,
    oauthRoutes,
} from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();

// define `pre` middleware configurations
app.use(express.json());

// log all requests
app.use(requestLogger);

// define routes
app.use("/health-check", healthCheckRoute);
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/sessions/", sessionRoutes);
app.use("/permissions", permissionRoutes);
app.use("/oauth", oauthRoutes);

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
