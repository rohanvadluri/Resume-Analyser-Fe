const API_ENDPOINTS = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
    changePassword: "/api/auth/change-password",
    forgotPassword: "/api/auth/forgot-password",
  },

  resume: {
    upload: "/api/resume/upload",
    myResume: "/api/resume/my-resume",

    getDetails: (resumeId: number) =>
      `/api/resume/getResumeDetails/${resumeId}`,

    delete: (resumeId: number) => `/api/resume/delete/${resumeId}`,

    download: (resumeId: number) => `/api/resume/download/${resumeId}`,
  },

  analysis: {
    analyzeResume: (resumeId: number) =>
        `/api/analysis/analyzeResume/${resumeId}`,

    getAnalysis: (analysisId: number) =>
        `/api/analysis/getResumeAnalysis/${analysisId}`,

    history: "/api/analysis/getAnalysisHistory",
},

};



export default API_ENDPOINTS;
