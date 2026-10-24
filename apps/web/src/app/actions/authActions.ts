"use server";

import { db, Role } from "@watq/database";
import { hashPassword, verifyPassword } from "@watq/security";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_COOKIE_NAME = "watq_auth_token";

export interface EnterpriseAuthUser {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "MEMBER";
  createdAt: string;
}

/**
 * Validates the caller's session from PostgreSQL.
 * Role data is fetched directly from the database, never from public client state.
 */
export async function getEnterpriseSessionAction(): Promise<{
  user: EnterpriseAuthUser | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return { user: null };
    }

    const session = await db.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return { user: null };
    }

    return {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as "ADMIN" | "MEMBER",
        createdAt: session.user.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("[EnterpriseAuth] getEnterpriseSession error:", error);
    return { user: null };
  }
}

/**
 * Authenticates user against Neon PostgreSQL using cryptographic password verification.
 * Zero hardcoded users or bypasses. Requires legitimate credentials.
 */
export async function signInEnterpriseAction(
  emailInput: string,
  passwordInput: string
): Promise<{
  success: boolean;
  error?: string;
  user?: EnterpriseAuthUser;
}> {
  try {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!password) {
      return { success: false, error: "Please enter your password." };
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    // Verify stored password hash from accounts table
    const account = await db.account.findFirst({
      where: {
        userId: user.id,
        providerId: "credential",
      },
    });

    if (!account || !account.password) {
      return { success: false, error: "Invalid email or password." };
    }

    const isMatch = verifyPassword(password, account.password);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    // Generate cryptographically secure session token
    const token = `watq_${crypto.randomBytes(32).toString("hex")}_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "ADMIN" | "MEMBER",
        createdAt: user.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("[EnterpriseAuth] signIn error:", error);
    return {
      success: false,
      error: "Authentication service unavailable. Please try again.",
    };
  }
}

/**
 * Registers a new member account into Neon PostgreSQL with salted password hashing.
 * Strictly assigns MEMBER role. Zero hardcoded promotions.
 */
export async function signUpEnterpriseAction(
  nameInput: string,
  emailInput: string,
  passwordInput: string
): Promise<{
  success: boolean;
  error?: string;
  user?: EnterpriseAuthUser;
}> {
  try {
    const email = emailInput.trim().toLowerCase();
    const name = nameInput.trim();
    const password = passwordInput.trim();

    if (!name) {
      return { success: false, error: "Name is required." };
    }
    if (!email || !email.includes("@")) {
      return { success: false, error: "Valid email address is required." };
    }
    if (!password || password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters long." };
    }

    const existing = await db.user.findUnique({
      where: { email },
    });

    if (existing) {
      return {
        success: false,
        error: "An account with this email address already exists.",
      };
    }

    // All public registrations receive MEMBER role by default
    const user = await db.user.create({
      data: {
        email,
        name,
        role: Role.MEMBER,
        emailVerified: true,
      },
    });

    // Hash and store credentials securely in accounts table
    const hashedPassword = hashPassword(password);
    await db.account.create({
      data: {
        userId: user.id,
        providerId: "credential",
        accountId: user.id,
        password: hashedPassword,
      },
    });

    const token = `watq_${crypto.randomBytes(32).toString("hex")}_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "ADMIN" | "MEMBER",
        createdAt: user.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("[EnterpriseAuth] signUp error:", error);
    return {
      success: false,
      error: "Registration failed. Please try again.",
    };
  }
}

/**
 * Revokes the session from PostgreSQL and clears the session cookie.
 */
export async function signOutEnterpriseAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      await db.session.deleteMany({
        where: { token },
      });
    }

    cookieStore.delete(SESSION_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    console.error("[EnterpriseAuth] signOut error:", error);
    return { success: true };
  }
}
