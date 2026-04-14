import { QueryCtx, MutationCtx } from "./_generated/server"

/**
 * Admin authentication helper
 * Checks if the request has valid admin credentials via session token
 */
export async function isAdmin(ctx: QueryCtx | MutationCtx, token?: string): Promise<boolean> {
    if (!token) return false

    const session = await ctx.db
        .query("auth_sessions")
        .withIndex("by_token", (q) => q.eq("token", token))
        .first()

    if (!session) return false

    if (session.expires_at < Date.now()) {
        // Optionally delete expired session
        return false
    }

    return true
}

/**
 * Guard function to ensure only admins can access
 * Throws an error if not admin
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx, token?: string) {
    const admin = await isAdmin(ctx, token)
    if (!admin) {
        throw new Error("Unauthorized: Admin access required")
    }
}

/**
 * Helper to get current timestamp
 */
export function now(): number {
    return Date.now()
}
