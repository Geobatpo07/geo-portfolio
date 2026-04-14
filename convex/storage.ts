import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { requireAdmin } from "./auth"

/**
 * Generate an upload URL for file storage (admin only)
 */
export const generateUploadUrl = mutation({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        await requireAdmin(ctx, token)

        return await ctx.storage.generateUploadUrl()
    },
})

/**
 * Get the URL for a stored file
 */
export const getFileUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, { storageId }) => {
        return await ctx.storage.getUrl(storageId as any)
    },
})

/**
 * Delete a file from storage (admin only)
 */
export const deleteFile = mutation({
    args: {
        storageId: v.id("_storage"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { storageId, token }) => {
        await requireAdmin(ctx, token)

        await ctx.storage.delete(storageId as any)

        return { success: true }
    },
})
