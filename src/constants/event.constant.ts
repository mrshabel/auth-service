export const Exchanges = Object.freeze({
    Auth: "auth_events",
});

export const ExchangeTypes = Object.freeze({
    Auth: "topic",
});

export const Queues = Object.freeze({
    Auth: "auth_queue",
});

export const AuthEventKeys = Object.freeze({
    UserRegistered: "auth.user.registered",
    PasswordResetRequested: "auth.user.password_reset",
    PasswordResetCompleted: "auth.user.password_changed",
    AccountVerified: "auth.user.verified",
});
