export type AuthResponse = {
  user: {
    id: string;
    email: string;
    role: string;
  };
  token?: string;
};

export type MessageResponse = {
  message: string;
};

// Payloads
export type LoginPayload = { email: string; password: string };
export type SignupPayload = LoginPayload;
export type ForgotPasswordPayload = { email: string };
export type ResetPasswordPayload = { resetToken: string; newPassword: string };