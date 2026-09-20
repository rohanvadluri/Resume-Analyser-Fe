/**
 * Response received after analyzing a resume.
 */
export interface AnalysisResponse {
    analysisId: number;
    resumeId: number;
    userId: number;
    extractedName: string;
    extractedEmail: string;
    extractedMobile: string;
    atsScore: number;
    wordCount: number;
    extractedSkills: string;
    missingSkills: string;
    sectionsFound: string;
    suggestions: string[];
    analysisStatus: string;
    analyzedAt: string;
}

/**
 * Response received for analysis history.
 */
export interface AnalysisHistoryResponse {
    analysisId: number;
    resumeId: number;
    userId: number;
    extractedName: string;
    atsScore: number;
    wordCount: number;
    analysisStatus: string;
    analyzedAt: string;
}

/**
 * Paginated response received for analysis history.
 */
export interface AnalysisHistoryPage {
    content: AnalysisHistoryResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}