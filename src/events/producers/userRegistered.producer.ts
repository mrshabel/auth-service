import logger from "../../utils/logger";
import { getBrokerChannel } from "..";
import { UserRegisteredEvent } from "../../types/event.type";
import { AuthEventKeys, Exchanges } from "../../constants/event.constant";
import { retryWithExponentialBackoff } from "../../utils/backoff";

export async function sendUserRegisteredEvent(data: UserRegisteredEvent) {
    try {
        // use an exponential backoff strategy to publish message
        await retryWithExponentialBackoff({
            operation: async () => {
                const channel = getBrokerChannel();

                // publish message to auth exchange with routing key
                const isPublished = channel.publish(
                    Exchanges.Auth,
                    AuthEventKeys.UserRegistered,
                    Buffer.from(JSON.stringify(data)),
                    { persistent: true }
                );

                if (!isPublished) {
                    throw new Error("Message not published. Retrying...");
                }

                logger.info(`User registered event published`);
            },
            initialWait: 200,
            factor: 2,
            maxRetries: 5,
        });
    } catch (error) {
        logger.error(
            { error },
            `Could not publish user registered event for user with id: ${data.userId}`
        );

        return;
    }
}
