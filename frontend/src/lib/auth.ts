import { fetcher } from './api';

export const login = (email: string, password: string) =>
  fetcher('/auth/login', 'POST', { email, password });

export const signup = (email: string, password: string) =>
  fetcher('/auth/signup', 'POST', { email, password });

export const forgotPassword = (email: string) =>
  fetcher('/auth/forgot-password', 'POST', { email });

export const resetPassword = (resetToken: string, newPassword: string) =>
  fetcher('/auth/reset-password', 'POST', { resetToken, newPassword });

export const checkProtected = (token: string) =>
  fetcher('/protected', 'GET', undefined, token);
