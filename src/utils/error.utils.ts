import { MongooseError } from "mongoose";
// base error class for application
class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    // accepts the message and status code
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        // rightly capture only exceptions thrown as responses
        this.isOperational = true;

        // capture the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        // call the parent constructor
        super(message, 400);
    }
}
class UnauthorizedError extends AppError {
    constructor(message = "Authorization Failed") {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}

class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
        super(message, 422);
    }
}

class InternalServerError extends AppError {
    constructor(message = "Internal Server Error") {
        super(message, 500);
    }
}

// class DatabaseConflict extends MongooseError {}

export {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    InternalServerError,
};
