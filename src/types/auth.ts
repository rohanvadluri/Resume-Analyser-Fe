/**
 * User information returned by the login API.
 */
export interface AuthUser {
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
    firstLogin: boolean;
}

/**
 * Login API response.
 */
export interface LoginResponse extends AuthUser {
    message: string;
}

/**
 * Login request.
 */
export interface LoginRequest {
    username: string;
    password: string;
}

/**
 * Register request.
 */
export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
}

/**
 * Register API response.
 */
export interface RegisterResponse {
    userId: number;
    username: string;
    role: string;
    status: string;
    message: string;
}
/**
 * Forgot Password Request.
 */
export interface ForgotPasswordRequest {
    email: string;
}


/**
 * Forgot Password API response.
 */
export interface ForgotPasswordResponse {
    message: string;
}
/**
 * Change Password Request.
 */
export interface ChangePasswordRequest {
    username: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}


/**
 * Change Password API response.
 */
export interface ChangePasswordResponse {
    message: string;
}