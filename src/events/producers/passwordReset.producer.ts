import logger from "../../utils/logger";
import { getBrokerChannel } from "..";
import { PasswordResetEvent } from "../../types/events.type";

export async function sendPasswordResetEvent(data: PasswordResetEvent) {
    try {
        const channel = getBrokerChannel();

        // create queue if it does not exist
        await channel.assertQueue("notification_events", { durable: true });

        // send message to queue. uses a default exchange since message is delivered to only one queue
        channel.sendToQueue(
            "notification_events",
            Buffer.from(JSON.stringify(data)),
            {
                persistent: true,
            }
        );

        logger.info(`Password Reset Event added to queue successfully`);
    } catch (error) {
        logger.error(error, "Could not send event");
        throw new Error("Failed to process event");
    }
}
