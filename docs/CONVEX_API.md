# Convex API Quick Reference

## Import Statements

```typescript
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { Id } from "../../convex/_generated/dataModel"
```

## Blog System

### Queries

```typescript
// Get all published posts (public)
const posts = useQuery(api.blog.getPublishedPosts)

// Get all posts including drafts (admin)
const allPosts = useQuery(api.blog.getAllPosts)

// Get single post by slug
const post = useQuery(api.blog.getPostBySlug, { slug: "my-post" })

// Get post by ID (admin)
const post = useQuery(api.blog.getPostById, { id: postId })

// Get all tags
const tags = useQuery(api.blog.getTags)

// Get comments for a post
const comments = useQuery(api.blog.getComments, { postId })

// Get tags for a post
const postTags = useQuery(api.blog.getPostTags, { postId })
```

### Mutations

```typescript
// Create a new post (admin)
const createPost = useMutation(api.blog.createPost)
await createPost({
  title: "My Post",
  slug: "my-post",
  description: "Description",
  content: "# Content",
  cover_image: "https://...",
  status: "draft" // or "published"
})

// Update a post (admin)
const updatePost = useMutation(api.blog.updatePost)
await updatePost({
  id: postId,
  title: "Updated Title",
  status: "published"
})

// Delete a post (admin)
const deletePost = useMutation(api.blog.deletePost)
await deletePost({ id: postId })

// Create a tag (admin)
const createTag = useMutation(api.blog.createTag)
const tagId = await createTag({ name: "TypeScript" })

// Delete a tag (admin)
const deleteTag = useMutation(api.blog.deleteTag)
await deleteTag({ id: tagId })

// Attach tag to post (admin)
const attachTag = useMutation(api.blog.attachTag)
await attachTag({ postId, tagId })

// Detach tag from post (admin)
const detachTag = useMutation(api.blog.detachTag)
await detachTag({ postId, tagId })

// Create a comment (public)
const createComment = useMutation(api.blog.createComment)
await createComment({
  postId,
  name: "John Doe",
  email: "john@example.com",
  comment: "Great post!"
})

// Delete a comment (admin)
const deleteComment = useMutation(api.blog.deleteComment)
await deleteComment({ id: commentId })
```

## Case Studies

### Queries

```typescript
// Get all published case studies (public)
const cases = useQuery(api.cases.getPublishedCases)

// Get all case studies including drafts (admin)
const allCases = useQuery(api.cases.getAllCases)

// Get single case study by slug
const caseStudy = useQuery(api.cases.getCaseBySlug, { slug: "my-case" })

// Get case study by ID (admin)
const caseStudy = useQuery(api.cases.getCaseById, { id: caseId })

// Get all case study tags
const tags = useQuery(api.cases.getCaseTags)
```

### Mutations

```typescript
// Create a new case study (admin)
const createCase = useMutation(api.cases.createCase)
await createCase({
  title: "My Case Study",
  slug: "my-case",
  description: "Description",
  content: "# Content",
  cover_image: "https://...",
  status: "draft"
})

// Update a case study (admin)
const updateCase = useMutation(api.cases.updateCase)
await updateCase({
  id: caseId,
  title: "Updated Title",
  status: "published"
})

// Delete a case study (admin)
const deleteCase = useMutation(api.cases.deleteCase)
await deleteCase({ id: caseId })

// Create a case tag (admin)
const createCaseTag = useMutation(api.cases.createCaseTag)
const tagId = await createCaseTag({ name: "Data Science" })

// Delete a case tag (admin)
const deleteCaseTag = useMutation(api.cases.deleteCaseTag)
await deleteCaseTag({ id: tagId })

// Attach tag to case (admin)
const attachCaseTag = useMutation(api.cases.attachCaseTag)
await attachCaseTag({ caseId, tagId })

// Detach tag from case (admin)
const detachCaseTag = useMutation(api.cases.detachCaseTag)
await detachCaseTag({ caseId, tagId })
```

## Messages (Contact Form)

### Queries

```typescript
// Get all messages (admin, real-time)
const messages = useQuery(api.messages.getMessages)

// Get message statistics (admin)
const stats = useQuery(api.messages.getMessageStats)
// Returns: { total: number, perMonth: Record<string, number>, recent: Message[] }
```

### Mutations

```typescript
// Create a message (public)
const createMessage = useMutation(api.messages.createMessage)
await createMessage({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello, I'd like to connect!"
})

// Delete a message (admin)
const deleteMessage = useMutation(api.messages.deleteMessage)
await deleteMessage({ id: messageId })
```

### Actions

```typescript
// Send email via Resend (called after creating message)
const sendEmail = useAction(api.email.sendContactEmail)
await sendEmail({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello!"
})
```

## File Storage

### Mutations

```typescript
// Generate upload URL (admin)
const generateUploadUrl = useMutation(api.storage.generateUploadUrl)
const uploadUrl = await generateUploadUrl()

// Upload file to Convex
const response = await fetch(uploadUrl, {
  method: "POST",
  headers: { "Content-Type": file.type },
  body: file
})
const { storageId } = await response.json()

// Delete a file (admin)
const deleteFile = useMutation(api.storage.deleteFile)
await deleteFile({ storageId })
```

### Queries

```typescript
// Get file URL
const getFileUrl = useQuery(api.storage.getFileUrl, { storageId })
```

## Usage Patterns

### Loading States

```typescript
const posts = useQuery(api.blog.getPublishedPosts)

if (posts === undefined) {
  return <div>Loading...</div>
}

if (posts === null) {
  return <div>No posts found</div>
}

return <div>{posts.map(post => ...)}</div>
```

### Error Handling

```typescript
const createPost = useMutation(api.blog.createPost)

try {
  await createPost({ ... })
  // Success!
} catch (error) {
  console.error("Error creating post:", error)
  alert(error.message)
}
```

### Real-Time Updates

```typescript
// This component automatically re-renders when messages change
function MessageList() {
  const messages = useQuery(api.messages.getMessages)
  
  return (
    <div>
      {messages?.map(msg => (
        <div key={msg._id}>{msg.message}</div>
      ))}
    </div>
  )
}
```

## TypeScript Types

```typescript
// Import generated types
import { Id } from "../../convex/_generated/dataModel"

// Use in your components
interface BlogPostFormProps {
  initialData?: {
    _id: Id<"blog_posts">
    title: string
    slug: string
    // ... other fields
  }
}
```

## Admin Guards

All admin-only mutations and queries automatically check for admin access via the `requireAdmin()` guard. Make sure to set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your Convex dashboard environment variables.

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
RESEND_API_KEY=re_...
```

### Backend (Convex Dashboard)
```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
RESEND_API_KEY=re_...
```
