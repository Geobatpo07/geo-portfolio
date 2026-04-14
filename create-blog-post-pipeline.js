const { ConvexHttpClient } = require("convex/browser");
const fs = require("fs");
const path = require("path");

// Read .env.local file manually
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
        const match = line.match(/^([^=:#]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            if (!process.env[key]) {
                process.env[key] = value;
            }
        }
    });
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!CONVEX_URL) {
    console.error("Error: NEXT_PUBLIC_CONVEX_URL not found in environment");
    process.exit(1);
}

if (!ADMIN_SECRET) {
    console.error("Error: ADMIN_SECRET not found in environment");
    process.exit(1);
}

const client = new ConvexHttpClient(CONVEX_URL);

const blogPost = {
    title: "Building a Modern Data Pipeline with Python and Convex",
    slug: "building-a-modern-data-pipeline-with-python-and-convex",
    description: "Learn how to build a scalable, real-time data pipeline using Python and Convex. This guide covers best practices, architecture patterns, and practical implementation tips.",
    content: `# Introduction

In today's data-driven world, building efficient and scalable data pipelines is crucial for any organization. In this article, I'll walk you through creating a modern data pipeline using Python and Convex, a powerful backend platform that simplifies real-time data synchronization.

## Why Convex?

Convex offers several advantages for data pipelines:

- **Real-time synchronization**: Data updates propagate instantly to all connected clients
- **Type-safe queries**: TypeScript/JavaScript integration with full type safety
- **Serverless architecture**: No infrastructure management required
- **Built-in caching**: Automatic query result caching for optimal performance

## Architecture Overview

Our data pipeline consists of three main components:

1. **Data Ingestion Layer**: Collects data from various sources
2. **Processing Layer**: Transforms and validates the data
3. **Storage Layer**: Persists data in Convex tables

## Implementation

### Setting Up Convex

First, install the Convex CLI and initialize your project:

\`\`\`bash
npm install convex
npx convex dev
\`\`\`

### Defining Your Schema

Create a schema that defines your data structure:

\`\`\`typescript
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  analytics_events: defineTable({
    event_type: v.string(),
    user_id: v.string(),
    timestamp: v.number(),
    properties: v.any(),
  }).index("by_user", ["user_id"])
    .index("by_timestamp", ["timestamp"]),
})
\`\`\`

### Creating Data Ingestion Functions

Build mutations to ingest data:

\`\`\`typescript
export const trackEvent = mutation({
  args: {
    event_type: v.string(),
    user_id: v.string(),
    properties: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics_events", {
      ...args,
      timestamp: Date.now(),
    })
  },
})
\`\`\`

## Best Practices

1. **Validate input data**: Always validate incoming data before processing
2. **Use indexes wisely**: Create indexes for frequently queried fields
3. **Batch operations**: Group related operations for better performance
4. **Monitor and log**: Implement comprehensive logging for debugging

## Conclusion

Building a data pipeline with Python and Convex provides a robust, scalable solution for modern applications. The real-time capabilities and serverless architecture make it an excellent choice for teams looking to move fast without sacrificing reliability.

Ready to build your own data pipeline? Start experimenting with Convex today!`,
    status: "published",
    token: ADMIN_SECRET,
};

async function createBlogPost() {
    try {
        console.log("Creating blog post...");
        console.log("Title:", blogPost.title);
        console.log("Slug:", blogPost.slug);

        // Import the API
        const api = require("./convex/_generated/api");

        const postId = await client.mutation(api.blog.createPost, blogPost);

        console.log("\n✅ Blog post created successfully!");
        console.log("Post ID:", postId);
        console.log("\nView your post at:");
        console.log(`http://localhost:3000/blog/${blogPost.slug}`);
    } catch (error) {
        console.error("\n❌ Error creating blog post:");
        console.error(error.message);
        if (error.data) {
            console.error("Details:", error.data);
        }
        process.exit(1);
    }
}

createBlogPost();
