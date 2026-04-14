import { query, mutation } from "./_generated/server"
import { v } from "convex/values"
import { requireAdmin, now } from "./auth"

// ============================================
// QUERIES
// ============================================

/**
 * Get all published blog posts (public)
 */
export const getPublishedPosts = query({
    args: {},
    handler: async (ctx) => {
        const posts = await ctx.db
            .query("blog_posts")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .order("desc")
            .collect()

        return posts
    },
})

/**
 * Get all blog posts including drafts (admin only)
 */
export const getAllPosts = query({
    args: { token: v.optional(v.string()) },
    handler: async (ctx, { token }) => {
        await requireAdmin(ctx, token)

        const posts = await ctx.db
            .query("blog_posts")
            .order("desc")
            .collect()

        return posts
    },
})

/**
 * Get a single blog post by slug
 */
export const getPostBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, { slug }) => {
        const post = await ctx.db
            .query("blog_posts")
            .withIndex("by_slug", (q) => q.eq("slug", slug))
            .first()

        if (!post) {
            return null
        }

        // Only return published posts to non-admins
        // For admin, we'd need to check auth here
        if (post.status !== "published") {
            // In a real implementation, check if user is admin
            return null
        }

        return post
    },
})

/**
 * Get a blog post by ID (admin only)
 */
export const getPostById = query({
    args: {
        id: v.id("blog_posts"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        const post = await ctx.db.get(id)
        return post
    },
})

/**
 * Get all blog tags
 */
export const getTags = query({
    args: {},
    handler: async (ctx) => {
        const tags = await ctx.db
            .query("blog_tags")
            .collect()

        return tags
    },
})

/**
 * Get comments for a specific post
 */
export const getComments = query({
    args: { postId: v.id("blog_posts") },
    handler: async (ctx, { postId }) => {
        const comments = await ctx.db
            .query("blog_comments")
            .withIndex("by_post", (q) => q.eq("post_id", postId))
            .order("desc")
            .collect()

        return comments
    },
})

/**
 * Get tags for a specific post
 */
export const getPostTags = query({
    args: { postId: v.id("blog_posts") },
    handler: async (ctx, { postId }) => {
        const postTags = await ctx.db
            .query("blog_post_tags")
            .withIndex("by_post", (q) => q.eq("post_id", postId))
            .collect()

        const tags = await Promise.all(
            postTags.map(async (pt) => {
                const tag = await ctx.db.get(pt.tag_id)
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
 * Create a new blog post (admin only)
 */
export const createPost = mutation({
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
            .query("blog_posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first()

        if (existing) {
            throw new Error("A post with this slug already exists")
        }

        const postId = await ctx.db.insert("blog_posts", {
            ...args,
            created_at: now(),
            updated_at: now(),
        })

        return postId
    },
})

/**
 * Update an existing blog post (admin only)
 */
export const updatePost = mutation({
    args: {
        id: v.id("blog_posts"),
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
                .query("blog_posts")
                .withIndex("by_slug", (q) => q.eq("slug", updates.slug!))
                .first()

            if (existing && existing._id !== id) {
                throw new Error("A post with this slug already exists")
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
 * Delete a blog post (admin only)
 */
export const deletePost = mutation({
    args: {
        id: v.id("blog_posts"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        // Delete associated post-tag relations
        const postTags = await ctx.db
            .query("blog_post_tags")
            .withIndex("by_post", (q) => q.eq("post_id", id))
            .collect()

        for (const pt of postTags) {
            await ctx.db.delete(pt._id)
        }

        // Delete associated comments
        const comments = await ctx.db
            .query("blog_comments")
            .withIndex("by_post", (q) => q.eq("post_id", id))
            .collect()

        for (const comment of comments) {
            await ctx.db.delete(comment._id)
        }

        // Delete the post
        await ctx.db.delete(id)

        return { success: true }
    },
})

/**
 * Create a new tag (admin only)
 */
export const createTag = mutation({
    args: {
        name: v.string(),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { name, token }) => {
        await requireAdmin(ctx, token)

        // Check if tag already exists
        const existing = await ctx.db
            .query("blog_tags")
            .withIndex("by_name", (q) => q.eq("name", name))
            .first()

        if (existing) {
            return existing._id
        }

        const tagId = await ctx.db.insert("blog_tags", { name })
        return tagId
    },
})

/**
 * Delete a tag (admin only)
 */
export const deleteTag = mutation({
    args: {
        id: v.id("blog_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        // Delete associated post-tag relations
        const postTags = await ctx.db
            .query("blog_post_tags")
            .withIndex("by_tag", (q) => q.eq("tag_id", id))
            .collect()

        for (const pt of postTags) {
            await ctx.db.delete(pt._id)
        }

        // Delete the tag
        await ctx.db.delete(id)

        return { success: true }
    },
})

/**
 * Attach a tag to a post (admin only)
 */
export const attachTag = mutation({
    args: {
        postId: v.id("blog_posts"),
        tagId: v.id("blog_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { postId, tagId, token }) => {
        await requireAdmin(ctx, token)

        // Check if relation already exists
        const existing = await ctx.db
            .query("blog_post_tags")
            .withIndex("by_post_and_tag", (q) =>
                q.eq("post_id", postId).eq("tag_id", tagId)
            )
            .first()

        if (existing) {
            return existing._id
        }

        const relationId = await ctx.db.insert("blog_post_tags", {
            post_id: postId,
            tag_id: tagId,
        })

        return relationId
    },
})

/**
 * Detach a tag from a post (admin only)
 */
export const detachTag = mutation({
    args: {
        postId: v.id("blog_posts"),
        tagId: v.id("blog_tags"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { postId, tagId, token }) => {
        await requireAdmin(ctx, token)

        const relation = await ctx.db
            .query("blog_post_tags")
            .withIndex("by_post_and_tag", (q) =>
                q.eq("post_id", postId).eq("tag_id", tagId)
            )
            .first()

        if (relation) {
            await ctx.db.delete(relation._id)
        }

        return { success: true }
    },
})

/**
 * Create a comment on a blog post (public)
 */
export const createComment = mutation({
    args: {
        postId: v.id("blog_posts"),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        comment: v.string(),
    },
    handler: async (ctx, { postId, ...rest }) => {
        const commentId = await ctx.db.insert("blog_comments", {
            post_id: postId,
            ...rest,
            created_at: now(),
        })

        return commentId
    },
})

/**
 * Delete a comment (admin only)
 */
export const deleteComment = mutation({
    args: {
        id: v.id("blog_comments"),
        token: v.optional(v.string()),
    },
    handler: async (ctx, { id, token }) => {
        await requireAdmin(ctx, token)

        await ctx.db.delete(id)

        return { success: true }
    },
})
