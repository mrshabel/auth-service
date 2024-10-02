import amqplib from "amqplib";
import { retryWithExponentialBackoff } from "../utils/backoff";
import logger from "../utils/logger";
import { config } from "../config";
import { ExchangeTypes, Exchanges } from "../constants/event.constant";

// declare connection and channel
let connection: amqplib.Connection;
let channel: amqplib.Channel;

export async function startBroker() {
    try {
        await retryWithExponentialBackoff({
            operation: async () => {
                connection = await amqplib.connect(
                    `amqp://${config.BROKER_HOST}:${config.BROKER_PORT}`
                );
                channel = await connection.createChannel();
                // assert primary exchange for auth service
                await channel.assertExchange(
                    Exchanges.Auth,
                    ExchangeTypes.Auth,
                    { durable: true }
                );
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
