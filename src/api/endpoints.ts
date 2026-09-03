const API_ENDPOINTS = {

    auth: {
        register: "/api/auth/register",
        login: "/api/auth/login",
        changePassword: "/api/auth/change-password",
        forgotPassword: "/api/auth/forgot-password",
    },

    resume: {
        upload: "/api/resume/upload",

        getDetails: (resumeId: number) =>
            `/api/resume/getResumeDetails/${resumeId}`,

        delete: (resumeId: number) =>
            `/api/resume/delete/${resumeId}`,

        download: (resumeId: number) =>
            `/api/resume/download/${resumeId}`,
    },

};

export default API_ENDPOINTS;