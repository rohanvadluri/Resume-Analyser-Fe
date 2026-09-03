import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, Sparkles } from "lucide-react";

import { forgotPassword } from "../../services/authService";

import type { ForgotPasswordRequest } from "../../types/auth";


function ForgotPassword() {

    const [formData, setFormData] =
        useState<ForgotPasswordRequest>({
            email: "",
        });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");

        setSuccess("");

        setIsLoading(true);


        try {

            const response =
                await forgotPassword(formData);

            setSuccess(response.message);

            setFormData({
                email: "",
            });

        } catch (error) {

            console.error(
                "Forgot password failed:",
                error
            );

            setError(
                "Unable to process your request. Please check your email and try again."
            );

        } finally {

            setIsLoading(false);

        }

    };


    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

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
                {/* CARD */}
                {/* ================================================= */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


                    {/* Header */}

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-slate-900">
                            Forgot your password?
                        </h2>


                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Enter your registered email address and
                            we'll send you a temporary password.
                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* ERROR */}
                    {/* ================================================= */}

                    {error && (

                        <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">

                            {error}

                        </div>

                    )}


                    {/* ================================================= */}
                    {/* SUCCESS */}
                    {/* ================================================= */}

                    {success && (

                        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-5 text-emerald-700">

                            {success}

                        </div>

                    )}


                    {/* ================================================= */}
                    {/* FORM */}
                    {/* ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>


                            <div className="relative">

                                <Mail
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                                />


                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="rohan@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                            </div>

                        </div>


                        {/* Submit Button */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <Send className="h-4 w-4" />

                            {isLoading
                                ? "Sending..."
                                : "Send Temporary Password"
                            }

                        </button>

                    </form>


                    {/* ================================================= */}
                    {/* BACK TO LOGIN */}
                    {/* ================================================= */}

                    <div className="mt-6 text-center">

                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                        >

                            <ArrowLeft className="h-4 w-4" />

                            Back to Login

                        </Link>

                    </div>

                </div>


                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <p className="mt-6 text-center text-xs text-slate-400">
                    ResumeAI · Resume Intelligence Platform
                </p>

            </div>

        </div>
    );
}


export default ForgotPassword;