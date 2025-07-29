import { fetcher } from './api_v2';
import { AuthResponse, MessageResponse, LoginPayload, SignupPayload, ForgotPasswordPayload, ResetPasswordPayload } from '@/src/types/auth';

// Auth API
export const login = (data: LoginPayload) =>
  fetcher.post<AuthResponse>('/auth/login',data);

export const signup = (data: SignupPayload) =>
  fetcher.post<AuthResponse>('/auth/signup',data);

export const forgotPassword = (data:ForgotPasswordPayload) =>
  fetcher.post<MessageResponse>('/auth/forgot-password',data);

export const resetPassword = (data: ResetPasswordPayload) =>
  fetcher.post<MessageResponse>('/auth/reset-password', data);

export const checkProtected = () =>
  fetcher.get<MessageResponse>('/protected');

export const logout = () =>
  fetcher.post<MessageResponse>('/auth/logout');
