import apiClient from "../api/axios";

import API_ENDPOINTS from "../api/endpoints";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from "../types/auth";

/**
 * Login User
 */
export const loginUser = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    API_ENDPOINTS.auth.login,
    request,
  );

  return response.data;
};

/**
 * Register User
 */
export const registerUser = async (
  request: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    API_ENDPOINTS.auth.register,
    request,
  );

  return response.data;
};

/**
 * Forgot Password.
 */
export const forgotPassword = async (
  request: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>(
    API_ENDPOINTS.auth.forgotPassword,
    request,
  );

  return response.data;
};
/**
 * Change Password.
 */
export const changePassword = async (
  request: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await apiClient.post<ChangePasswordResponse>(
    API_ENDPOINTS.auth.changePassword,
    request,
  );

  return response.data;
};
