# Modern Editorial Blog

![App Preview](https://images.unsplash.com/photo-1499750310159-52f8f6152133?w=1200&h=300&fit=crop&auto=format)

A modern, responsive blog application built with Next.js 16 and Cosmic CMS. This application demonstrates a fully functional content platform featuring posts, authors, and categories.

## Features

*   **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, and Tailwind CSS.
*   **Dynamic Routing**: Individual pages for every post, author, and category.
*   **Rich Content**: Full Markdown support for article content.
*   **Relational Data**: Demonstrates deep linking between objects (Posts -> Authors -> Categories).
*   **Performance**: Server-side rendering and optimized image delivery.
*   **Responsive Design**: Mobile-first approach ensuring great reading experience on all devices.

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=693e677b11e1fbc7687b1b15&clone_repository=693e6a0c11e1fbc7687b1b52)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

## Technologies

*   [Next.js 16](https://nextjs.org/) - The React Framework for the Web
*   [Cosmic CMS](https://www.cosmicjs.com/) - Headless CMS
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
*   [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown renderer
*   [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

### Prerequisites

*   Node.js 18+ or Bun
*   A Cosmic CMS account and project

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/modern-blog.git
    cd modern-blog
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Configure environment variables:
    Create a `.env.local` file with your Cosmic credentials.

4.  Run the development server:
    ```bash
    bun dev
    ```

## Deployment

This application is ready for deployment on Vercel or Netlify.

### Vercel Deployment

1.  Push your code to a Git repository.
2.  Import the project in Vercel.
3.  Add your environment variables (`COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`).
4.  Deploy!
<!-- README_END -->