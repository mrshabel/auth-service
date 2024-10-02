interface BaseEvent {
    eventType: string;
    userId: string;
    timestamp: Date;
}

export interface UserRegisteredEvent extends BaseEvent {
    eventType: "user_registered";
    email: string;
    url: string;
}

export interface PasswordResetEvent extends BaseEvent {
    eventType: "password_reset";
    email: string;
    url: string;
}
