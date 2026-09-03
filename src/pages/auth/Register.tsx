import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Sparkles, User } from "lucide-react";

import { registerUser } from "../../services/authService";

import type { RegisterRequest } from "../../types/auth";


function Register() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState<RegisterRequest>({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
    });


    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);


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
     * Handle registration.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");

        setSuccessMessage("");

        setIsLoading(true);


        try {

            const response = await registerUser(formData);

            setSuccessMessage(response.message);

            /*
             * Give the user a moment to see
             * the successful registration message.
             */
            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            console.error("Registration failed:", error);

            setError(
                "Registration failed. Please check your details and try again."
            );

        } finally {

            setIsLoading(false);

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
                {/* REGISTER CARD */}
                {/* ================================================= */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">


                    {/* Heading */}

                    <div className="mb-6">

                        <h2 className="text-xl font-semibold text-slate-900">
                            Create your account
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter your details to get started with ResumeAI.
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

                    {successMessage && (

                        <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">

                            {successMessage}

                        </div>

                    )}


                    {/* ================================================= */}
                    {/* FORM */}
                    {/* ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* ================================================= */}
                        {/* FIRST NAME */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="firstName"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                First Name
                            </label>


                            <div className="relative">

                                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />


                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    placeholder="Rohan"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    maxLength={50}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* LAST NAME */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="lastName"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Last Name
                            </label>


                            <div className="relative">

                                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />


                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    placeholder="Vadluri"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    maxLength={50}
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* EMAIL */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>


                            <div className="relative">

                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />


                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="rohan@gmail.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    maxLength={100}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* MOBILE NUMBER */}
                        {/* ================================================= */}

                        <div>

                            <label
                                htmlFor="mobileNumber"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Mobile Number
                            </label>


                            <div className="relative">

                                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />


                                <input
                                    id="mobileNumber"
                                    type="tel"
                                    name="mobileNumber"
                                    placeholder="9876543210"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    maxLength={10}
                                    pattern="[6-9][0-9]{9}"
                                    inputMode="numeric"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />

                            </div>


                            <p className="mt-1.5 text-xs text-slate-400">
                                Enter a valid 10-digit Indian mobile number.
                            </p>

                        </div>


                        {/* ================================================= */}
                        {/* REGISTER BUTTON */}
                        {/* ================================================= */}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {isLoading
                                ? "Creating account..."
                                : "Create Account"
                            }

                        </button>

                    </form>


                    {/* ================================================= */}
                    {/* LOGIN LINK */}
                    {/* ================================================= */}

                    <div className="mt-6 text-center text-sm text-slate-500">

                        <span>
                            Already have an account?
                        </span>{" "}

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                        >
                            Login
                        </button>

                    </div>


                </div>


                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <p className="mt-6 text-center text-xs text-slate-400">
                    Secure registration · ResumeAI
                </p>


            </div>

        </div>
    );
}


export default Register;