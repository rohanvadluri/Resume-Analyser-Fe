/**
 * Response received after uploading a resume.
 */
export interface ResumeUploadResponse {
    resumeId: number;
    originalFileName: string;
    resumeStatus: string;
    message: string;
}

/**
 * Response received when fetching resume details.
 */
export interface ResumeResponse {
    resumeId: number;
    userId: number;
    originalFileName: string;
    fileSize: number;
    fileType: string;
    resumeStatus: string;
    uploadDate: string;
}

/**
 * Response received when downloading a resume.
 */
export interface ResumeDownloadResponse {
    fileName: string;
    fileType: string;
    fileData: number[];
}