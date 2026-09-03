import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Lock,
    Mail,
    Sparkles,
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import type { LoginRequest } from "../../types/auth";


function Login() {

    const navigate = useNavigate();

    const { login, isLoading } = useAuth();


    const [formData, setFormData] = useState<LoginRequest>({
        username: "",
        password: "",
    });


    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);


    /**
     * Handle input changes.
     */
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    /**
     * Handle Login.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");


        try {

            await login(formData);

            navigate("/dashboard");

        } catch (error) {

            console.error("Login failed:", error);

            setError(
                "Invalid username or password. Please try again."
            );

        }

    };


    return (

        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">

            <div className="w-full max-w-md">


                {/* ================================================= */}
                {/* LOGO */}
                {/* ================================================= */}

                <div className="mb-8 flex flex-col items-center">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-sm">

                        <Sparkles className="h-6 w-6 text-white" />

                    </div>


                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                        ResumeAI
                    </h1>


                    <p className="mt-1 text-sm text-slate-500">
                        Resume Intelligence Platform
                    </p>

                </div>


                {/* ================================================= */}
                {/* LOGIN CARD */}
                {/* ================================================= */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


                    {/* Heading */}

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Sign in to continue to your dashboard.
                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* ERROR MESSAGE */}
                    {/* ================================================= */}

                    {error && (

                        <div
                            role="alert"
                            className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"
                        >
                            {error}
                        </div>

                    )}


                    {/* ================================================= */}
                    {/* LOGIN FORM */}
                    {/* ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* ================================================= */}
                        {/* EMAIL */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="username"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>


                            <div className="relative">

                                <Mail
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                />


                                <input
                                    id="username"
                                    type="email"
                                    name="username"
                                    placeholder="rohan@gmail.com"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* PASSWORD */}
                        {/* ================================================= */}

                        <div>

                            <div className="mb-2 flex items-center justify-between">

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Password
                                </label>


                                {/* Forgot Password */}

                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                                >
                                    Forgot password?
                                </Link>

                            </div>


                            <div className="relative">

                                {/* Lock Icon */}

                                <Lock
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                />


                                {/* Password Input */}

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                                />


                                {/* ================================================= */}
                                {/* SHOW / HIDE PASSWORD */}
                                {/* ================================================= */}

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
                                >

                                    {showPassword ? (

                                        <EyeOff className="h-4 w-4" />

                                    ) : (

                                        <Eye className="h-4 w-4" />

                                    )}

                                </button>

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* LOGIN BUTTON */}
                        {/* ================================================= */}

                        <button
                            type="submit"
                            disabled={
                                isLoading ||
                                !formData.username ||
                                !formData.password
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {isLoading ? (

                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />

                                    Logging in...
                                </>

                            ) : (

                                "Login"

                            )}

                        </button>

                    </form>


                    {/* ================================================= */}
                    {/* REGISTER */}
                    {/* ================================================= */}

                    <div className="mt-6 text-center">

                        <p className="text-sm text-slate-500">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
                            >
                                Create account
                            </Link>

                        </p>

                    </div>

                </div>


                {/* ================================================= */}
                {/* SECURITY MESSAGE */}
                {/* ================================================= */}

                <p className="mt-6 text-center text-xs text-slate-400">
                    Secure login · ResumeAI
                </p>

            </div>

        </div>
    );
}


export default Login;
