import pino from "pino";
import pinoHttp from "pino-http";

const logger = pino({
    transport: { target: "pino-pretty", options: { colorize: true } },
    base: { pid: false },
});

// reference: https://github.com/pinojs/pino-http
export const requestLogger = pinoHttp({
    logger: logger,

    // hide req, res object auto logging
    serializers: {
        req: (req) => {},
        res: (res) => {},
        responseTime: (val) => {},
    },

    // define custom levels
    customLogLevel: (req, res, err) => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            return "warn";
        } else if (res.statusCode >= 500 || err) {
            return "error";
        }
        return "info";
    },

    // set success and error response structure
    customSuccessMessage: (req, res, time) => {
        return `${req.method} - ${req.url} ${res.statusCode} - ${time}ms`;
    },
    customErrorMessage: (req, res, err) => {
        return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
    },
});
export default logger;
