export type ExponentialBackoff = {
    operation: () => Promise<unknown>;
    initialWait: number;
    factor: number;
    maxRetries: number;
};
