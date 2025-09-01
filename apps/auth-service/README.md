# NestJS Backend with AWS Cognito Authentication

This project is a NestJS backend application that implements authentication using AWS Cognito. It provides endpoints for user login, registration, and password management, including handling multi-factor authentication (MFA) and password reset challenges.

## Project Structure

```
nestjs-backend
├── src
│   ├── app.module.ts         # Main application module
│   └── auth
│       ├── auth.module.ts    # Auth module encapsulating authentication functionality
│       ├── auth.controller.ts # Controller defining authentication endpoints
│       ├── auth.service.ts    # Service containing business logic for authentication
│       ├── cognito.client.ts   # Configured Cognito client instance
│       └── dto
│           ├── login.dto.ts    # Data transfer object for login
│           ├── register.dto.ts  # Data transfer object for registration
│           ├── forgot-password.dto.ts # Data transfer object for forgot password
│           └── challenge.dto.ts  # Data transfer object for handling password challenges
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Endpoints

- **POST /auth/login**: Authenticates a user using AWS Cognito.
- **POST /auth/register**: Registers a new user in AWS Cognito.
- **POST /auth/forgot-password**: Initiates the password reset process for a user.
- **POST /auth/challenge**: Handles password challenges such as MFA and password reset.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nestjs-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure AWS Cognito settings in the environment variables or directly in the code.

4. Start the application:
   ```
   npm run start
   ```

## License

This project is licensed under the MIT License.