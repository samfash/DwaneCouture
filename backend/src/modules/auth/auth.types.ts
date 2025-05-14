export type UserRole = "user" | "admin" | "tailor";

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isoauth?: boolean;
  resettoken?: string;
  resettokenexpiry?: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  user: Omit<User, "password">;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
export interface OAuthUser {
  id: string;
  email: string; 
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: 'user' | 'admin' | 'tailor';
    isoauth?: boolean;
  };
 
}