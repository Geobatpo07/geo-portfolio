import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { requireAdmin, now } from "./auth"

// ============================================
// QUERIES
// ============================================

/**
 * Get all contact messages (admin only, real-time)
 */
export const getMessages = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        await requireAdmin(ctx, token)

        const messages = await ctx.db
            .query("messages")
            .withIndex("by_created_at")
            .order("desc")
            .collect()

        return messages
    },
})

/**
 * Get message statistics for dashboard (admin only)
 */
export const getMessageStats = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        await requireAdmin(ctx, token)

        const messages = await ctx.db
            .query("messages")
            .collect()

        const total = messages.length

        // Group by month
        const perMonth: Record<string, number> = {}
        messages.forEach((msg) => {
            const date = new Date(msg.created_at)
            const monthKey = date.toLocaleString("default", {
                month: "short",
                year: "numeric"
            })
            perMonth[monthKey] = (perMonth[monthKey] || 0) + 1
        })

        return {
            total,
            perMonth,
            recent: messages.slice(0, 5), // Last 5 messages
        }
    },
})

// ============================================
// MUTATIONS
// ============================================

/**
 * Create a new contact message (public)
 * Also sends email via Resend
 */
export const createMessage = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { name, email, message }) => {
        // Validation
        if (!name || !email || !message) {
            throw new Error("All fields are required")
        }

        if (!email.includes("@")) {
            throw new Error("Invalid email address")
        }

        // Save to database
        const messageId = await ctx.db.insert("messages", {
            name,
            email,
            message,
            created_at: now(),
        })

        // TODO: Send email via Resend
        // This will need to be done via an action since mutations can't make HTTP requests
        // For now, we'll just save the message

        return messageId
    },
})

/**
 * Delete a message (admin only)
 */
export const deleteMessage = mutation({
    args: {
        id: v.id("messages"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        await ctx.db.delete(id)

        return { success: true }
    },
})
