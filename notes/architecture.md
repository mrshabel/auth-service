# Architectural and Design Considerations

### Event Publishing

The authentication service has a main queue listening to all events, thus serving as an **event bus.** Consistency across publishers and subscribers is not fully guaranteed in the current setup due to the fact that an error can halt the publishing process. To help address these inconsistencies between data synching on the producers and consumers, backoff strategies can be implemented to retry the publishing operation whenever it fails. This however, does not guarantee that messages will always be published. Another solution is to first publish the event before processing it in the producer application, ensuring that consistency is achieved. This method could be done vice-versa where the producer application rollback its changes when the broker fails. A minor disadvantage regarding this approach is that the services are producer application and message broker are tightly coupled and fully dependent on each other. A much better approach could be used here where the producer and broker can access events to be published independently. The **Outbox Pattern** as described will help us achieve eventual consistency in this case

#### Outbox Pattern

Payloads to be dispatched to the broker are written to an `outbox` database table where a separate process constantly poll changes in the outbox and publish them to the message broker. The outbox table records the topic, routing key, payload, and a flag indicating whether the message has been published or not. Idempotency is also guranteed here in the sense that a message will be processed only once. The steps involved are:

1. When saving the record in the database, also save in in the `outbox` table with the appropriate tags within the same transaction
2. A separate process reads from the `outbox` table and publishes the events to the message broker. On success, the processed event in the `outbox` table can either be flagged as processed or deleted.
