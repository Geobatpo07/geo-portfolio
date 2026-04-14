import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    // ============================================
    // BLOG SYSTEM
    // ============================================

    blog_posts: defineTable({
        title: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        content: v.optional(v.string()), // Markdown content
        cover_image: v.optional(v.string()), // URL or storage ID
        status: v.union(v.literal("draft"), v.literal("published")),
        created_at: v.number(), // timestamp
        updated_at: v.number(), // timestamp
    })
        .index("by_slug", ["slug"])
        .index("by_status", ["status"])
        .index("by_created_at", ["created_at"]),

    blog_tags: defineTable({
        name: v.string(),
    })
        .index("by_name", ["name"]),

    blog_post_tags: defineTable({
        post_id: v.id("blog_posts"),
        tag_id: v.id("blog_tags"),
    })
        .index("by_post", ["post_id"])
        .index("by_tag", ["tag_id"])
        .index("by_post_and_tag", ["post_id", "tag_id"]),

    blog_comments: defineTable({
        post_id: v.id("blog_posts"),
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        comment: v.string(),
        created_at: v.number(),
    })
        .index("by_post", ["post_id"])
        .index("by_created_at", ["created_at"]),

    // ============================================
    // CASE STUDIES
    // ============================================

    case_studies: defineTable({
        title: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        content: v.optional(v.string()), // MDX-like content
        cover_image: v.optional(v.string()),
        status: v.union(v.literal("draft"), v.literal("published")),
        created_at: v.number(),
        updated_at: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_status", ["status"])
        .index("by_created_at", ["created_at"]),

    case_tags: defineTable({
        name: v.string(),
    })
        .index("by_name", ["name"]),

    case_post_tags: defineTable({
        case_id: v.id("case_studies"),
        tag_id: v.id("case_tags"),
    })
        .index("by_case", ["case_id"])
        .index("by_tag", ["tag_id"])
        .index("by_case_and_tag", ["case_id", "tag_id"]),

    // ============================================
    // CONTACT MESSAGES
    // ============================================

    messages: defineTable({
        name: v.string(),
        email: v.string(),
        message: v.string(),
        created_at: v.number(),
    })
        .index("by_created_at", ["created_at"]),

    // ============================================
    // AUTHENTICATION
    // ============================================

    auth_sessions: defineTable({
        token: v.string(),
        expires_at: v.number(),
    })
        .index("by_token", ["token"]),
})
