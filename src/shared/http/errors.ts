/**
 * Standard error types for the application
 */
export class AppError extends Error {
	constructor(
		message: string,
		public code: string,
		public statusCode: number = 500,
	) {
		super(message);
		this.name = "AppError";
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(message, "VALIDATION_ERROR", 400);
		this.name = "ValidationError";
	}
}

export class AuthenticationError extends AppError {
	constructor(message: string = "Authentication required") {
		super(message, "AUTHENTICATION_ERROR", 401);
		this.name = "AuthenticationError";
	}
}

export class AuthorizationError extends AppError {
	constructor(message: string = "Insufficient permissions") {
		super(message, "AUTHORIZATION_ERROR", 403);
		this.name = "AuthorizationError";
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = "Resource not found") {
		super(message, "NOT_FOUND", 404);
		this.name = "NotFoundError";
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, "CONFLICT", 409);
		this.name = "ConflictError";
	}
}

/**
 * Format error for API responses
 */
export function formatErrorResponse(error: unknown) {
	if (error instanceof AppError) {
		return {
			error: {
				message: error.message,
				code: error.code,
				statusCode: error.statusCode,
			},
		};
	}

	if (error instanceof Error) {
		return {
			error: {
				message: error.message,
				code: "INTERNAL_ERROR",
				statusCode: 500,
			},
		};
	}

	return {
		error: {
			message: "An unexpected error occurred",
			code: "UNKNOWN_ERROR",
			statusCode: 500,
		},
	};
}
