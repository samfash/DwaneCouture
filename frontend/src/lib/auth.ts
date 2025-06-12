import { fetcher } from './api';

export const login = (email: string, password: string) =>{
  return fetcher('/auth/login', 'POST', { email, password });}

export const signup = (email: string, password: string) =>{
  return fetcher('/auth/signup', 'POST', { email, password });}

export const forgotPassword = (email: string) =>{
  return fetcher('/auth/forgot-password', 'POST', { email });}

export const resetPassword = (resetToken: string, newPassword: string) =>{
  return fetcher('/auth/reset-password', 'POST', { resetToken, newPassword });}

export const checkProtected = () =>{
  return fetcher('/protected', 'GET', undefined);}

export const logout = async () =>{
 await fetch("/auth/logout", {
    method: "POST",
    credentials: "include",
  });}