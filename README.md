# Data Science Portfolio

This is a Data Science Portfolio website built with Next.js, Tailwind CSS, ShadCN UI, and MDX.

## Features

- **Next.js 14+ (App Router)**: Modern React framework.
- **Tailwind CSS**: Utility-first CSS framework.
- **ShadCN UI**: Reusable components built with Radix UI and Tailwind CSS.
- **MDX**: Markdown for the component era, used for blog posts and project case studies.
- **Dark Mode**: Built-in dark mode support.
- **Responsive Design**: Optimized for all devices.

## Getting Started

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Run the development server**:
    ```bash
    npm run dev
    ```

3. **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## Adding Content

### Projects
Add new projects by creating a new `.mdx` file in `src/content/projects/`.
The frontmatter should include:
```yaml
---
title: Project Title
description: Brief description
date: 'YYYY-MM-DD'
tags: ['Tag1', 'Tag2']
---
```
Also update `src/lib/data.ts` to include the project in the featured list if desired.

### Blog Posts
Add new blog posts by creating a new `.mdx` file in `src/content/blog/`.
The frontmatter should include:
```yaml
---
title: Blog Title
description: Brief description
date: 'YYYY-MM-DD'
tags: ['Tag1', 'Tag2']
---
```
Also update `src/lib/data.ts` to include the post in the list.

## Deployment

This project is optimized for deployment on Vercel.

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Vercel will automatically detect the Next.js settings and deploy.
4. Your site will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables are required for the basic setup.

## Project Structure

```
geo-portfolio/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog pages
│   │   ├── contact/        # Contact page
│   │   ├── projects/       # Projects pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── shared/         # Shared components (Navbar, Footer, etc.)
│   │   └── ui/             # UI components (Button, Card, etc.)
│   ├── content/            # MDX content files
│   │   ├── blog/           # Blog posts
│   │   └── projects/       # Project case studies
│   └── lib/                # Utility functions
├── public/                 # Static assets
└── package.json

```

## Customization

- **Colors**: Edit `src/app/globals.css` to change the theme colors.
- **Components**: Modify components in `src/components/`.
- **Pages**: Edit pages in `src/app/`.
- **Content**: Update project and blog data in `src/lib/data.ts`.

## Notes

- The project currently uses static content for blog posts and projects. Full MDX support can be added by integrating the MDX files in `src/content/`.
- Dark mode is enabled by default with system preference detection.
- All components are fully responsive and optimized for mobile devices.
