"use server";

import { db, Role } from "@watq/database";
import { generateSecureToken, hashPassword, verifyPassword } from "@watq/security";
import { formatZodError, signInSchema, signUpSchema } from "@/lib/validations";
import { cookies } from "next/headers";

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
  passwordInput: string,
): Promise<{
  success: boolean;
  error?: string;
  user?: EnterpriseAuthUser;
}> {
  try {
    const parseResult = signInSchema.safeParse({
      email: emailInput,
      password: passwordInput,
    });

    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }

    const { email, password } = parseResult.data;

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

    // Generate cryptographically secure session token via Web Crypto API
    const token = `watq_${generateSecureToken(32)}_${Date.now()}`;
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
  passwordInput: string,
): Promise<{
  success: boolean;
  error?: string;
  user?: EnterpriseAuthUser;
}> {
  try {
    const parseResult = signUpSchema.safeParse({
      name: nameInput,
      email: emailInput,
      password: passwordInput,
    });

    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }

    const { name, email, password } = parseResult.data;

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

    // Generate cryptographically secure session token via Web Crypto API
    const token = `watq_${generateSecureToken(32)}_${Date.now()}`;
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
