"use server";

import {
  createEnterpriseUserSchema,
  formatZodError,
  updateUserRoleSchema,
} from "@/lib/validations";
import { Role, db } from "@watq/database";
import { revalidatePath } from "next/cache";
import { getEnterpriseSessionAction } from "./authActions";

export interface EnterpriseUserRecord {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "MEMBER";
  emailVerified: boolean;
  createdAt: string;
  assessmentsCount: number;
}

/**
 * Ensures the requesting user is authenticated and holds the ADMIN role in PostgreSQL.
 */
async function assertAdminRole() {
  const session = await getEnterpriseSessionAction();
  if (!session.user || session.user.role !== "ADMIN") {
    throw new Error("UNAUTHORIZED: Enterprise administrator privileges required.");
  }
  return session.user;
}

/**
 * Fetches all registered users from Neon PostgreSQL.
 * Strict RBAC: Accessible only by ADMIN users.
 */
export async function getEnterpriseUsersAction(): Promise<{
  success: boolean;
  users?: EnterpriseUserRecord[];
  error?: string;
}> {
  try {
    await assertAdminRole();

    const users = await db.user.findMany({
      include: {
        _count: {
          select: { assessments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role as "ADMIN" | "MEMBER",
        emailVerified: u.emailVerified,
        createdAt: u.createdAt.toISOString(),
        assessmentsCount: u._count.assessments,
      })),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load enterprise users";
    console.error("[EnterpriseUsers] getEnterpriseUsers error:", message);
    return { success: false, error: message };
  }
}

/**
 * Mutates a user's role in PostgreSQL (ADMIN <-> MEMBER).
 * Role is strictly written to the database.
 */
export async function updateEnterpriseUserRoleAction(
  targetUserId: string,
  newRole: "ADMIN" | "MEMBER",
): Promise<{ success: boolean; error?: string }> {
  try {
    const parseResult = updateUserRoleSchema.safeParse({ targetUserId, newRole });
    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }

    const adminUser = await assertAdminRole();

    // Prevent admin from accidentally demoting themselves if they are the only admin
    if (adminUser.id === targetUserId && newRole !== "ADMIN") {
      const adminCount = await db.user.count({ where: { role: Role.ADMIN } });
      if (adminCount <= 1) {
        return {
          success: false,
          error: "Cannot demote the primary administrator account.",
        };
      }
    }

    await db.user.update({
      where: { id: targetUserId },
      data: { role: newRole as Role },
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update role in database";
    console.error("[EnterpriseUsers] updateEnterpriseUserRole error:", message);
    return { success: false, error: message };
  }
}

/**
 * Creates a new user with a specified role directly in Neon PostgreSQL.
 */
export async function createEnterpriseUserAction(data: {
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
}): Promise<{ success: boolean; error?: string; user?: EnterpriseUserRecord }> {
  try {
    await assertAdminRole();

    const parseResult = createEnterpriseUserSchema.safeParse(data);
    if (!parseResult.success) {
      return { success: false, error: formatZodError(parseResult.error) };
    }

    const { name, email, role } = parseResult.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return { success: false, error: "A user with this email already exists." };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        role: role as Role,
        emailVerified: true,
      },
      include: {
        _count: { select: { assessments: true } },
      },
    });

    revalidatePath("/admin");

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as "ADMIN" | "MEMBER",
        emailVerified: user.emailVerified,
        createdAt: user.createdAt.toISOString(),
        assessmentsCount: user._count.assessments,
      },
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create user in database";
    console.error("[EnterpriseUsers] createEnterpriseUser error:", message);
    return { success: false, error: message };
  }
}

/**
 * Deletes a user record and their sessions from Neon PostgreSQL.
 */
export async function deleteEnterpriseUserAction(
  targetUserId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminUser = await assertAdminRole();

    if (adminUser.id === targetUserId) {
      return { success: false, error: "Cannot delete your own active administrator account." };
    }

    await db.user.delete({
      where: { id: targetUserId },
    });

    revalidatePath("/admin");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete user from database";
    console.error("[EnterpriseUsers] deleteEnterpriseUser error:", message);
    return { success: false, error: message };
  }
}
