export interface UserRegisteredEvent {
    // event: "user_registered";
    email: string;
    url: string;
}

export interface PasswordResetEvent {
    // event: "user_registered";
    email: string;
    name: string;
    url: string;
}
