export type UserRole = "ADMIN" | "MEMBER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  avatarSeed?: string;
  bio?: string;
}

export interface AuthSession {
  user: User | null;
  token: string | null;
  expiresAt: string | null;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
}
