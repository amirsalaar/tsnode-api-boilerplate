import winston from "winston";
import expressWinston from "express-winston";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" }),
    ],
    format: winston.format.combine(
        winston.format.simple(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
    ),
};

const logger = winston.createLogger(options);

const expressWinstonOptions: expressWinston.LoggerOptions = {
    winstonInstance: logger,
    expressFormat: true,
};

if (!process.env.DEBUG) {
    expressWinstonOptions.meta = false;
    if (typeof global.it === "function") {
        expressWinstonOptions.level = "http";
    }
}
export const expressLogger = expressWinston.logger(expressWinstonOptions);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
