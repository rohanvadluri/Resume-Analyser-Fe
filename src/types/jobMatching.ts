export interface JobMatchRequest {
    resumeId: number;
    jobDescription: string;
}

export interface JobMatchResponse {
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    suggestions: string[];
}

export interface JobMatchHistoryResponse {
    jobMatchId: number;
    resumeId: number;
    userId: number;
    matchScore: number;
    matchStatus: string;
    matchedAt: string;
}

export interface JobMatchDetailResponse {
    jobMatchId: number;
    resumeId: number;
    userId: number;
    matchScore: number;
    matchingSkills: string;
    missingSkills: string;
    suggestions: string;
    jobDescription: string;
    matchStatus: string;
    matchedAt: string;
}

export interface JobMatchHistoryPage {
    content: JobMatchHistoryResponse[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}