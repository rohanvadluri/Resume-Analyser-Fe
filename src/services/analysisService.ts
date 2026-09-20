import apiClient from "../api/axios";
import API_ENDPOINTS from "../api/endpoints";
    
import type {
    AnalysisResponse,
    AnalysisHistoryPage,
} from "../types/analysis";

/**
 * Analyze Resume
 */ 
export const analyzeResume = async (
    resumeId: number
): Promise<AnalysisResponse> => {

    const response = await apiClient.post<AnalysisResponse>(
        API_ENDPOINTS.analysis.analyzeResume(resumeId)
    );

    return response.data;
};


/**
 * Get Analysis Details
 */
export const getAnalysisDetails = async (
    analysisId: number
): Promise<AnalysisResponse> => {

    const response = await apiClient.get<AnalysisResponse>(
        API_ENDPOINTS.analysis.getAnalysis(analysisId)
    );

    return response.data;
};

/**
 * Get Analysis History
 */
export const getAnalysisHistory = async (
    page: number = 0,
    size: number = 10
): Promise<AnalysisHistoryPage> => {

    const response = await apiClient.get<AnalysisHistoryPage>(
        API_ENDPOINTS.analysis.history,
        {
            params: {
                page,
                size,
            },
        }
    );

    return response.data;
};