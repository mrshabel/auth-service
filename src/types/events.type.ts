export interface UserRegisteredEvent {
    email: string;
    url: string;
}

export interface UserPasswordResetEvent {
    email: string;
    name: string;
    url: string;
}
