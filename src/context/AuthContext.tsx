import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type {
    AuthUser,
    LoginRequest,
} from "../types/auth";

import { loginUser } from "../services/authService";

import {
    saveAuthUser,
    getAuthUser,
    clearAuthUser,
} from "../utils/authStorage";


interface AuthContextType {

    user: AuthUser | null;

    isAuthenticated: boolean;

    isLoading: boolean;

    login: (request: LoginRequest) => Promise<void>;

    logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);


interface AuthProviderProps {

    children: ReactNode;

}


export function AuthProvider({
    children,
}: AuthProviderProps) {

    /*
     * Get previously logged-in user from localStorage.
     *
     * This allows the user to remain logged in
     * even after refreshing the browser.
     */
    const [user, setUser] = useState<AuthUser | null>(
        getAuthUser()
    );


    const [isLoading, setIsLoading] = useState(false);


    /**
     * Login User
     */
    const login = async (
        request: LoginRequest
    ): Promise<void> => {

        setIsLoading(true);

        try {

            const response = await loginUser(request);


            const authenticatedUser: AuthUser = {

                userId: response.userId,

                username: response.username,

                firstName: response.firstName,

                lastName: response.lastName,

                role: response.role,

                status: response.status,

                firstLogin: response.firstLogin,

            };


            /*
             * Save user in React state.
             */
            setUser(authenticatedUser);


            /*
             * Save user in localStorage.
             */
            saveAuthUser(authenticatedUser);

        } finally {

            setIsLoading(false);

        }
    };


    /**
     * Logout User
     */
    const logout = () => {

        /*
         * Remove user from React state.
         */
        setUser(null);


        /*
         * Remove user from localStorage.
         */
        clearAuthUser();

    };


    return (
        <AuthContext.Provider
            value={{

                user,

                isAuthenticated: user !== null,

                isLoading,

                login,

                logout,

            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


export function useAuthContext(): AuthContextType {

    const context = useContext(AuthContext);


    if (!context) {

        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );

    }


    return context;
}