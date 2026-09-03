import { useState } from "react";
import {
    Eye,
    EyeOff,
    KeyRound,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { changePassword } from "../../services/authService";

import type { ChangePasswordRequest } from "../../types/auth";


function ProfilePage() {

    const { user } = useAuth();


    const [formData, setFormData] =
        useState<ChangePasswordRequest>({
            username: user?.username ?? "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });


    const [showOldPassword, setShowOldPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);


    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");


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
     * Handle Change Password.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setError("");

        setSuccessMessage("");


        /*
         * Validate new password and
         * confirm password.
         */
        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {

            setError(
                "New password and confirm password do not match."
            );

            return;
        }


        setIsLoading(true);


        try {

            const response =
                await changePassword(formData);


            setSuccessMessage(
                response.message
            );


            /*
             * Clear password fields
             * after successful change.
             */
            setFormData((previous) => ({
                ...previous,
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            }));

        } catch (error) {

            console.error(
                "Change password failed:",
                error
            );

            setError(
                "Unable to change password. Please check your current password and try again."
            );

        } finally {

            setIsLoading(false);

        }

    };


    return (
        <div className="space-y-6">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage your account information and password.
                </p>

            </div>


            {/* ================================================= */}
            {/* PROFILE INFORMATION */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">

                        <User className="h-5 w-5 text-indigo-600" />

                    </div>


                    <div>

                        <h2 className="text-base font-semibold text-slate-900">
                            Account Information
                        </h2>

                        <p className="text-sm text-slate-500">
                            Your registered account details.
                        </p>

                    </div>

                </div>


                <div className="mt-6 grid gap-5 sm:grid-cols-2">


                    {/* Name */}

                    <div>

                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Full Name
                        </p>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">

                            <User className="h-4 w-4 text-slate-400" />

                            <p className="text-sm font-medium text-slate-700">

                                {user
                                    ? `${user.firstName} ${user.lastName}`
                                    : "User"
                                }

                            </p>

                        </div>

                    </div>


                    {/* Email */}

                    <div>

                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Email
                        </p>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">

                            <Mail className="h-4 w-4 text-slate-400" />

                            <p className="truncate text-sm font-medium text-slate-700">
                                {user?.username ?? "Not available"}
                            </p>

                        </div>

                    </div>


                    {/* Role */}

                    <div>

                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Role
                        </p>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">

                            <ShieldCheck className="h-4 w-4 text-slate-400" />

                            <p className="text-sm font-medium text-slate-700">
                                {user?.role ?? "USER"}
                            </p>

                        </div>

                    </div>


                    {/* Status */}

                    <div>

                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                            Account Status
                        </p>

                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">

                            <span className="h-2 w-2 rounded-full bg-emerald-500" />

                            <p className="text-sm font-medium text-slate-700">
                                {user?.status ?? "ACTIVE"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* CHANGE PASSWORD */}
            {/* ================================================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">


                {/* Header */}

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">

                        <KeyRound className="h-5 w-5 text-indigo-600" />

                    </div>


                    <div>

                        <h2 className="text-base font-semibold text-slate-900">
                            Change Password
                        </h2>

                        <p className="text-sm text-slate-500">
                            Update your account password securely.
                        </p>

                    </div>

                </div>


                {/* ================================================= */}
                {/* ERROR */}
                {/* ================================================= */}

                {error && (

                    <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">

                        {error}

                    </div>

                )}


                {/* ================================================= */}
                {/* SUCCESS */}
                {/* ================================================= */}

                {successMessage && (

                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

                        {successMessage}

                    </div>

                )}


                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >


                    {/* Username */}

                    <div>

                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Username
                        </label>

                        <div className="relative">

                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="username"
                                type="email"
                                name="username"
                                value={formData.username}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-500 outline-none"
                            />

                        </div>

                    </div>


                    {/* Old Password */}

                    <div>

                        <label
                            htmlFor="oldPassword"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Current Password
                        </label>

                        <div className="relative">

                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="oldPassword"
                                type={
                                    showOldPassword
                                        ? "text"
                                        : "password"
                                }
                                name="oldPassword"
                                placeholder="Enter current password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowOldPassword(
                                        (previous) => !previous
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                aria-label={
                                    showOldPassword
                                        ? "Hide current password"
                                        : "Show current password"
                                }
                            >

                                {showOldPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}

                            </button>

                        </div>

                    </div>


                    {/* New Password */}

                    <div>

                        <label
                            htmlFor="newPassword"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            New Password
                        </label>

                        <div className="relative">

                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="newPassword"
                                type={
                                    showNewPassword
                                        ? "text"
                                        : "password"
                                }
                                name="newPassword"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(
                                        (previous) => !previous
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                aria-label={
                                    showNewPassword
                                        ? "Hide new password"
                                        : "Show new password"
                                }
                            >

                                {showNewPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}

                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div>

                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Confirm New Password
                        </label>

                        <div className="relative">

                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (previous) => !previous
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >

                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}

                            </button>

                        </div>

                    </div>


                    {/* Button */}

                    <div className="flex justify-end pt-2">

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            <KeyRound className="h-4 w-4" />

                            {isLoading
                                ? "Changing Password..."
                                : "Change Password"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


export default ProfilePage;