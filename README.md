# Authentication Microservice

This microservice application provides authentication and authorization functionalities using OAuth 2.0 with Google integration. It handles user authentication, session management, granular permission management, and JWT-based authorization for secure access to resources.

## Getting Started

To run this application locally, Docker is required. Follow these steps to set up the project:

### Prerequisites

-   Docker installed on your local machine
    Installation [Link](https://docs.docker.com/engine/install/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mrshabel/auth-service.git
    cd auth-service
    ```

2. Create a `.env` file in the root directory and add the following configuration:

    ```.env
    PORT=8000
    MONGO_INITDB_ROOT_USERNAME=your_database_username
    MONGO_INITDB_ROOT_PASSWORD=your_database_password
    MONGO_INITDB_DATABASE=auth-service
    DATABASE_URL=mongodb://your_database_username:your_database_passworddb:27017/auth-service
    NODE_ENV=development
    JWT_SECRET=your_jwt_secret_here
    JWT_ACCESS_TOKEN_EXPIRY=3600  # in seconds (e.g., 1 hour)
    JWT_REFRESH_TOKEN_EXPIRY=604800  # in seconds (e.g., 7 days)
    COOKIE_DOMAIN=your_domain.com OR localhost # prefix the value with dot (.) to allow for subdomain cookie access
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

    Replace placeholders with appropriate values. Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from the Google Developer Console after creating a project.

3. Build and run the Docker container:

    - Enable watch feature to detect changes in code

    ```bash
    docker-compose up --watch
    ```

    - Disable logs from console
        ```bash
        docker-compose up --build
        ```

    ```

    This command starts the application and its dependencies defined in `docker-compose.yml`.
    ```

## Usage

Once the application is running, you can access the API and authentication endpoints.

-   Open your web browser and navigate to `http://localhost:8000` to view the application.

## Google OAuth2 Integration

1. Go to the [Google Developer Console](https://console.developers.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **Credentials** and create OAuth 2.0 credentials.
4. Add the following details to your OAuth consent screen:
    - Authorized redirect URI (development): `http://localhost:8000/auth/google/`
    - Authorized redirect URI (production): `https://your_domain/auth/google/`
5. Select `email` and `profile` information as the scopes
6. Obtain `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` and update your `.env` file accordingly.
