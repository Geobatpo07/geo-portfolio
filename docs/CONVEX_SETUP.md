# Convex Migration Setup Guide

## Step 1: Initialize Convex

Run the following command to initialize Convex and create your deployment:

```bash
npx convex dev
```

This will:
- Prompt you to log in to Convex (or create an account)
- Create a new Convex project
- Generate the `_generated` files with TypeScript types
- Give you a deployment URL

## Step 2: Set Environment Variables

### In `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
RESEND_API_KEY=your_resend_api_key
```

### In Convex Dashboard (https://dashboard.convex.dev):
Go to your project settings and add these environment variables:
- `ADMIN_EMAIL` - Your admin email
- `ADMIN_PASSWORD` - Your admin password
- `RESEND_API_KEY` - Your Resend API key (for email sending)

## Step 3: Remove Supabase

Once Convex is working, remove Supabase:

```bash
npm uninstall @supabase/ssr
```

Delete these files/folders:
- `src/utils/supabase/` (entire directory)
- `src/app/api/` (entire directory - all API routes)
- `supabase/` directory
- `supabase_schema.sql`

## Step 4: Run Development Server

```bash
# Terminal 1: Run Convex backend
npm run convex:dev

# Terminal 2: Run Next.js frontend
npm run dev
```

## Notes

- All Supabase API routes have been replaced with Convex mutations and queries
- Real-time updates now work automatically with Convex subscriptions
- Admin authentication is handled via Convex environment variables
- File uploads use Convex File Storage

## Troubleshooting

If you see TypeScript errors about `_generated` files, make sure:
1. You've run `npx convex dev` successfully
2. The `convex/_generated` directory exists
3. Your `NEXT_PUBLIC_CONVEX_URL` is set correctly in `.env.local`
