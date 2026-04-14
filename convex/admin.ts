import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { now } from "./auth"

/**
 * Login as admin
 * Verifies credentials against environment variables and creates a session
 */
export const login = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, { email, password }) => {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminEmail || !adminPassword) {
            throw new Error("Admin configuration missing")
        }

        if (email !== adminEmail || password !== adminPassword) {
            throw new Error("Invalid credentials")
        }

        // Create session
        // Simple random token generation
        const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)
        const expiresAt = now() + 24 * 60 * 60 * 1000 // 24 hours

        await ctx.db.insert("auth_sessions", {
            token,
            expires_at: expiresAt,
        })

        return { token }
    },
})

/**
 * Logout (delete session)
 */
export const logout = mutation({
    args: { token: v.string() },
    handler: async (ctx, { token }) => {
        const session = await ctx.db
            .query("auth_sessions")
            .withIndex("by_token", (q) => q.eq("token", token))
            .first()

        if (session) {
            await ctx.db.delete(session._id)
        }
    },
})

/**
 * Check if a token is valid
 */
export const checkAuth = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        if (!token) return false

        const session = await ctx.db
            .query("auth_sessions")
            .withIndex("by_token", (q) => q.eq("token", token))
            .first()

        if (!session) return false

        if (session.expires_at < now()) {
            return false
        }

        return true
    },
})
