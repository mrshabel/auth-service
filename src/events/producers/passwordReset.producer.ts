import logger from "../../utils/logger";
import { getBrokerChannel } from "..";
import { PasswordResetEvent } from "../../types/event.type";
import { retryWithExponentialBackoff } from "../../utils/backoff";
import {
    AuthEventKeys,
    Exchanges,
    ExchangeTypes,
} from "../../constants/event.constant";

export async function sendPasswordResetEvent(data: PasswordResetEvent) {
    try {
        // use an exponential backoff strategy to publish message
        await retryWithExponentialBackoff({
            operation: async () => {
                const channel = getBrokerChannel();

                // publish message to auth exchange with routing key
                const isPublished = channel.publish(
                    Exchanges.Auth,
                    AuthEventKeys.PasswordResetRequested,
                    Buffer.from(JSON.stringify(data)),
                    { persistent: true }
                );

                if (!isPublished) {
                    throw new Error("Message not published. Retrying...");
                }

                logger.info(`Password Reset Event added to queue successfully`);
            },
            initialWait: 200,
            factor: 2,
            maxRetries: 5,
        });
    } catch (error) {
        logger.error(
            { error },
            `Could not publish password reset event for user with id: ${data.userId}`
        );

        return;
    }
}
