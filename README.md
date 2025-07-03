# 2008-Style Facebook Wall Clone

A modern, real-time Facebook Wall clone built with Next.js, React, Supabase, Tailwind CSS, and shadcn/ui. Post messages and images, see posts update instantly, and enjoy a classic Facebook-inspired UI.

## Features
- Real-time wall feed (auto-updating)
- Post text (max 280 characters)
- Attach and preview images with each post
- Classic Facebook wall layout and profile sidebar
- Responsive and mobile-friendly
- No authentication: all posts use a pre-set user profile

## Tech Stack
- Next.js 15 / React 19
- Supabase (Database + Storage)
- Tailwind CSS
- shadcn/ui (Radix UI)

## Setup Instructions

### 1. Clone and Install
```bash
git clone https://github.com/thegoner24/wall-fb-inspired.git
cd wall-fb-inspired
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
Get these from your Supabase project dashboard.

### 3. Supabase Setup
- **Table:** `posts`
  - Columns:
    - `id` (uuid, PK, default: uuid_generate_v4())
    - `content` (text)
    - `image` (text, nullable)
    - `user` (text)
    - `avatar_url` (text, nullable)
    - `created_at` (timestamp, default: now())
- **Storage Bucket:** `post-images` (public)
  - Create in Supabase Storage dashboard
  - Add policies:
    - For uploads:
      ```sql
      create policy "Public upload for post-images"
        on storage.objects for insert
        with check (bucket_id = 'post-images');
      ```
    - For reads:
      ```sql
      create policy "Public read for post-images"
        on storage.objects for select
        using (bucket_id = 'post-images');
      ```

### 4. Run Locally
```bash
npm run dev
```
Go to [http://localhost:3000](http://localhost:3000)

## Usage
- Type your post (max 280 chars)
- (Optional) Click "Choose Image" to attach a photo
- Click "Post" to publish to the wall
- Posts appear instantly with your preset user info

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
