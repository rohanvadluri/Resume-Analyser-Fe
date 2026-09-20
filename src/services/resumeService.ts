import apiClient from "../api/axios";
import API_ENDPOINTS from "../api/endpoints";

import type {
    ResumeUploadResponse,
    ResumeResponse,
} from "../types/resume";


/**
 * Upload Resume
 */
export const uploadResume = async (
    resume: File
): Promise<ResumeUploadResponse> => {

    const formData = new FormData();

    formData.append("resume", resume);

    const response = await apiClient.post<ResumeUploadResponse>(
        API_ENDPOINTS.resume.upload,
        formData
    );

    return response.data;
};


/**
 * Get Resume Details
 */
export const getResumeDetails = async (
    resumeId: number
): Promise<ResumeResponse> => {

    const response = await apiClient.get<ResumeResponse>(
        API_ENDPOINTS.resume.getDetails(resumeId)
    );

    return response.data;
};

/**
 * Get Resume Details for the logged-in user
 */
export const getMyResume = async (): Promise<ResumeResponse> => {

    const response = await apiClient.get<ResumeResponse>(
        API_ENDPOINTS.resume.myResume
    );

    return response.data;
}; 

/**
 * Delete Resume
 */
export const deleteResume = async (
    resumeId: number
): Promise<void> => {

    await apiClient.delete(
        API_ENDPOINTS.resume.delete(resumeId)
    );
};


/**
 * Download Resume
 */
export const downloadResume = async (
    resumeId: number
): Promise<Blob> => {

    const response = await apiClient.get(
        API_ENDPOINTS.resume.download(resumeId),
        {
            responseType: "blob",
        }
    );

    return response.data;
};