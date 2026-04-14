import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { requireAdmin, now } from "./auth"

// ============================================
// QUERIES
// ============================================

/**
 * Get all published case studies (public)
 */
export const getPublishedCases = query({
    args: {},
    handler: async (ctx) => {
        const cases = await ctx.db
            .query("case_studies")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .order("desc")
            .collect()

        return cases
    },
})

/**
 * Get all case studies including drafts (admin only)
 */
export const getAllCases = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        await requireAdmin(ctx, token)

        const cases = await ctx.db
            .query("case_studies")
            .order("desc")
            .collect()

        return cases
    },
})

/**
 * Get a single case study by slug
 */
export const getCaseBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, { slug }) => {
        const caseStudy = await ctx.db
            .query("case_studies")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first()

        if (!caseStudy) {
            return null
        }

        // Only return published cases to non-admins
        if (caseStudy.status !== "published") {
            return null
        }

        return caseStudy
    },
})

/**
 * Get a case study by ID (admin only)
 */
export const getCaseById = query({
    args: {
        id: v.id("case_studies"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        const caseStudy = await ctx.db.get(id)
        return caseStudy
    },
})

/**
 * Get all case study tags
 */
export const getCaseTags = query({
    args: {},
    handler: async (ctx) => {
        const tags = await ctx.db
            .query("case_tags")
            .collect()

        return tags
    },
})

/**
 * Get tags for a specific case study
 */
export const getCaseTagsForCase = query({
    args: { caseId: v.id("case_studies") },
    handler: async (ctx, { caseId }) => {
        const caseTags = await ctx.db
            .query("case_post_tags")
            .withIndex("by_case", (q) => q.eq("case_id", caseId))
            .collect()

        const tags = await Promise.all(
            caseTags.map(async (ct) => {
                const tag = await ctx.db.get(ct.tag_id)
                return tag
            })
        )

        return tags.filter((tag) => tag !== null)
    },
})

// ============================================
// MUTATIONS
// ============================================

/**
 * Create a new case study (admin only)
 */
export const createCase = mutation({
    args: {
        title: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        content: v.optional(v.string()),
        cover_image: v.optional(v.string()),
        status: v.union(v.literal("draft"), v.literal("published")),
        token: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx, args.token)

        // Check if slug already exists
        const existing = await ctx.db
            .query("case_studies")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first()

        if (existing) {
            throw new Error("A case study with this slug already exists")
        }

        const caseId = await ctx.db.insert("case_studies", {
            ...args,
            created_at: now(),
            updated_at: now(),
        })

        return caseId
    },
})

/**
 * Update an existing case study (admin only)
 */
export const updateCase = mutation({
    args: {
        id: v.id("case_studies"),
        title: v.optional(v.string()),
        slug: v.optional(v.string()),
        description: v.optional(v.string()),
        content: v.optional(v.string()),
        cover_image: v.optional(v.string()),
        status: v.optional(v.union(v.literal("draft"), v.literal("published"))),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token, ...updates }) => {
        await requireAdmin(ctx, token)

        // If slug is being updated, check for conflicts
        if (updates.slug) {
            const existing = await ctx.db
                .query("case_studies")
                .withIndex("by_slug", (q) => q.eq("slug", updates.slug!))
                .first()

            if (existing && existing._id !== id) {
                throw new Error("A case study with this slug already exists")
            }
        }

        await ctx.db.patch(id, {
            ...updates,
            updated_at: now(),
        })

        return id
    },
})

/**
 * Delete a case study (admin only)
 */
export const deleteCase = mutation({
    args: {
        id: v.id("case_studies"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        // Delete associated case-tag relations
        const caseTags = await ctx.db
            .query("case_post_tags")
            .withIndex("by_case", (q) => q.eq("case_id", id))
            .collect()

        for (const ct of caseTags) {
            await ctx.db.delete(ct._id)
        }

        // Delete the case study
        await ctx.db.delete(id)

        return { success: true }
    },
})

/**
 * Create a new case tag (admin only)
 */
export const createCaseTag = mutation({
    args: {
        name: v.string(),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { name, token }) => {
        await requireAdmin(ctx, token)

        // Check if tag already exists
        const existing = await ctx.db
            .query("case_tags")
            .withIndex("by_name", (q) => q.eq("name", name))
            .first()

        if (existing) {
            return existing._id
        }

        const tagId = await ctx.db.insert("case_tags", { name })
        return tagId
    },
})

/**
 * Delete a case tag (admin only)
 */
export const deleteCaseTag = mutation({
    args: {
        id: v.id("case_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        // Delete associated case-tag relations
        const caseTags = await ctx.db
            .query("case_post_tags")
            .withIndex("by_tag", (q) => q.eq("tag_id", id))
            .collect()

        for (const ct of caseTags) {
            await ctx.db.delete(ct._id)
        }

        // Delete the tag
        await ctx.db.delete(id)

        return { success: true }
    },
})

/**
 * Attach a tag to a case study (admin only)
 */
export const attachCaseTag = mutation({
    args: {
        caseId: v.id("case_studies"),
        tagId: v.id("case_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { caseId, tagId, token }) => {
        await requireAdmin(ctx, token)

        // Check if relation already exists
        const existing = await ctx.db
            .query("case_post_tags")
            .withIndex("by_case_and_tag", (q) =>
                q.eq("case_id", caseId).eq("tag_id", tagId)
            )
            .first()

        if (existing) {
            return existing._id
        }

        const relationId = await ctx.db.insert("case_post_tags", {
            case_id: caseId,
            tag_id: tagId,
        })

        return relationId
    },
})

/**
 * Detach a tag from a case study (admin only)
 */
export const detachCaseTag = mutation({
    args: {
        caseId: v.id("case_studies"),
        tagId: v.id("case_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { caseId, tagId, token }) => {
        await requireAdmin(ctx, token)

        const relation = await ctx.db
            .query("case_post_tags")
            .withIndex("by_case_and_tag", (q) =>
                q.eq("case_id", caseId).eq("tag_id", tagId)
            )
            .first()

        if (relation) {
            await ctx.db.delete(relation._id)
        }

        return { success: true }
    },
})
