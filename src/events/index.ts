import amqplib from "amqplib";
import { retryWithExponentialBackoff } from "../utils/backoff";
import logger from "../utils/logger";

// declare connection and channel
let connection: amqplib.Connection;
let channel: amqplib.Channel;

export async function startBroker() {
    try {
        await retryWithExponentialBackoff({
            operation: async () => {
                connection = await amqplib.connect("amqp://rabbitmq:5672");
                channel = await connection.createChannel();
            },
            initialWait: 1000,
            factor: 2,
            maxRetries: 5,
        });
        logger.info("Message broker connected successfully");
    } catch (error) {
        logger.error(error, "Error connecting to database");
        process.exit(1);
    }
}

export function getBrokerChannel() {
    if (!channel) {
        throw new Error("Message broker connection not initialized");
    }

    return channel;
}

export async function closeBroker() {
    if (channel) {
        await channel.close();
    }

    if (connection) {
        await connection.close();
    }

    console.log("Broker connection closed");
}
