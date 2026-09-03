import type { AuthUser } from "../types/auth";

const AUTH_USER_KEY = "authUser";

/**
 * Save authenticated user information.
 */
export const saveAuthUser = (user: AuthUser): void => {
    localStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify(user)
    );
};

/**
 * Get authenticated user information.
 */
export const getAuthUser = (): AuthUser | null => {

    const storedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!storedUser) {
        return null;
    }

    return JSON.parse(storedUser) as AuthUser;
};

/**
 * Remove authenticated user information.
 */
export const clearAuthUser = (): void => {
    localStorage.removeItem(AUTH_USER_KEY);
};

/**
 * Check whether a user is logged in.
 */
export const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_USER_KEY) !== null;
};